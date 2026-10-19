/**
 * 按身体分组生成一张遮罩画布。
 *
 * 画布分两遍绘制：
 * 1. `groups` 中的图层用 `source-over` 正常绘制，作为遮罩内容；
 * 2. `rGroups` 中的图层用 `destination-out` 擦除，在遮罩上挖出镂空。
 *
 * 结果作为 `alphaTex` 传给自定义绘制（如 `GLImageRenderer.drawImage`），
 * 从而让衣物遮挡或穿透指定的身体部件。
 */
export class PartsMask {
    /**
     * 一次绘制所需的图层列表，每项为 [图片地址, X 偏移, Y 偏移]。
     * 顺序即绘制顺序，因此数组内容与顺序共同决定遮罩外观。
     * @typedef {[string,number,number][]} PartialDrawState
     */

    /**
     * @param {HTMLCanvasElement} canvas 用于绘制遮罩的画布，尺寸需与角色画布一致
     * @param {CustomGroupName[]} groups 参与绘制的分组（遮罩内容）
     * @param {CustomGroupName[]} [rGroups] 需要从遮罩中擦除的分组（镂空）
     */
    constructor(canvas, groups, rGroups) {
        /**
         * 遮罩画布
         * @private
         * @type {HTMLCanvasElement}
         */
        this._canvas = canvas;

        /**
         * 遮罩内容分组
         * @private
         * @type {CustomGroupName[]}
         */
        this._groups = groups;

        /**
         * 擦除分组
         * @private
         * @type {CustomGroupName[]}
         */
        this._rGroups = rGroups ?? [];

        /**
         * 上一次成功绘制的遮罩内容状态，用于跳过无变化的重复绘制；
         * 为 `undefined` 表示上次未绘制完成（或画布内容失效），需要重绘。
         * @private
         * @type {PartialDrawState | undefined}
         */
        this._state = undefined;

        /**
         * 上一次成功绘制的擦除状态，含义同 `_state`
         * @private
         * @type {PartialDrawState | undefined}
         */
        this._rState = undefined;
    }

    /**
     * 计算指定分组当前应绘制的图层列表。
     *
     * 按游戏自身的规则解析姿势、绘制坐标、图层类型、颜色后缀与父组前缀，
     * 拼出与 `DrawCharacter` 一致的图片地址。
     * @private
     * @param {Character} C
     * @param {CustomGroupName[]} groups
     * @return {PartialDrawState}
     */
    _calState(C, groups) {
        /** @type {PartialDrawState} */
        const state = [];

        /** @type {AssetLayer[]} */
        const layers = groups.flatMap((g) => C.AppearanceLayers.filter((l) => l.Asset.Group.Name === g));
        for (const layer of layers) {
            // 该图层当前没有可见图片，无需绘制
            if (!layer.HasImage) continue;

            const asset = layer.Asset;
            const group = asset.Group;
            const item = C.Appearance.find((i) => i.Asset === asset);
            const pose = CommonDrawResolveAssetPose(C, layer);
            const groupName = asset.DynamicGroupName;
            const { X, Y } = CommonDrawComputeDrawingCoordinates(C, asset, layer, groupName, item.Property);

            const typeRecord = item.Property?.TypeRecord || {};
            const layerType = layer.CreateLayerTypes.map((k) => `${k}${typeRecord[k] || 0}`).join("");
            const layerSegment = layer.Name || "";

            const layerColor = CommonDrawResolveLayerColor(C, item, layer, groupName);

            const parentGroupName = layer.ParentGroup[pose] ?? layer.ParentGroup[PoseType.DEFAULT];
            const parentAssetName = parentGroupName
                ? C.Appearance.find((i) => i.Asset.Group.Name === parentGroupName)?.Asset.Name || ""
                : "";

            const poseSegment = ((p) =>
                /** @type {string[]}*/ ([PoseType.HIDE, PoseType.DEFAULT]).includes(p) ? null : p)(
                pose === "" ? "" : layer.PoseMapping[pose]
            );

            const shouldColorize = layer.AllowColorize && layerColor && layerColor.startsWith("#");
            const colorSegment = (() => {
                if (shouldColorize) {
                    return layer.ColorSuffix ? layer.ColorSuffix.HEX_COLOR : "";
                } else {
                    if (layerColor && layerColor !== "Default" && !layerColor.startsWith("#")) {
                        return layerColor;
                    }
                }
            })();

            const baseURL = AssetBaseURL(C, group, groupName, poseSegment, layer, layerType, asset);

            const layerURL = `${[asset.Name, parentAssetName, layerType, colorSegment, layerSegment].filter(Boolean).join("_")}.png`;
            state.push([`${baseURL}${layerURL}`, X, Y]);
        }
        return state;
    }

    /**
     * 比较两次状态是否完全一致（图片地址与坐标都相同），用于跳过无变化的绘制。
     * @private
     * @param {PartialDrawState | undefined} s1
     * @param {PartialDrawState | undefined} s2
     */
    _stateCompare(s1, s2) {
        if (!s1 || !s2) return false;
        if (s1.length !== s2.length) return false;
        for (let i = 0; i < s1.length; i++) {
            const [url1, x1, y1] = s1[i];
            const [url2, x2, y2] = s2[i];
            if (url1 !== url2 || x1 !== x2 || y1 !== y2) return false;
        }
        return true;
    }

    /**
     * 遮罩画布本身，通常作为 `alphaTex` 交给后续绘制使用。
     * @return {HTMLCanvasElement}
     */
    get result() {
        return this._canvas;
    }

    /**
     * 将一组图层绘制到画布上。
     *
     * R133 起 `DrawGetImage` 在图片加载完成前返回 `undefined`：此时跳过该图，
     * 并返回 `undefined` 表示这次绘制不完整，调用方不记录状态、留待下次重试。
     * @private
     * @param {PartialDrawState} state
     * @param {GlobalCompositeOperation} operation
     * @param {boolean} [clear] 是否先清空画布
     * @returns {PartialDrawState | undefined} 绘制完成时返回 state，否则返回 undefined
     */
    _render(state, operation, clear = false) {
        const ctx = this._canvas.getContext("2d");
        if (!ctx) return undefined;

        if (clear) ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        ctx.globalCompositeOperation = operation;

        const complete = state.reduce((complete, [url, x, y]) => {
            const img = DrawGetImage(url);
            if (!img) return false;
            ctx.drawImage(img, x, y - CanvasUpperOverflow);
            return complete;
        }, true);

        return complete ? state : undefined;
    }

    /**
     * 按角色当前外观更新遮罩画布。
     *
     * 两遍绘制都只在状态变化或 `C.MustDraw` 时执行：
     * 先整体重绘遮罩内容，再用 `destination-out` 擦出镂空。
     * @param {Character} C
     */
    draw(C) {
        const newState = this._calState(C, this._groups);
        if (C.MustDraw || !this._state || !this._stateCompare(newState, this._state)) {
            // 画布内容整体重画，之前的擦除结果一并作废
            this._rState = undefined;
            this._state = this._render(newState, "source-over", true);
        }

        const nrState = this._calState(C, this._rGroups);
        if (C.MustDraw || !this._rState || !this._stateCompare(nrState, this._rState)) {
            this._rState = this._render(nrState, "destination-out");
        }
    }
}
