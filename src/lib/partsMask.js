export class PartsMask {
    /**
     * @typedef {[string,number,number][]} PartialDrawState
     */

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {CustomGroupName[]} groups
     */
    constructor(canvas, groups) {
        /**
         * @private
         * @type {HTMLCanvasElement}
         */
        this._canvas = canvas;

        /**
         * @private
         * @type {CustomGroupName[]}
         */
        this._groups = groups;

        /**
         * @private
         * @type {PartialDrawState | undefined}
         */
        this._state = undefined;
    }

    /**
     * @private
     * @param {Character} C
     * @return {PartialDrawState}
     */
    _calState(C) {
        /** @type {PartialDrawState} */
        const state = [];

        /** @type {AssetLayer[]} */
        const layers = this._groups.flatMap((g) => C.AppearanceLayers.filter((l) => l.Asset.Group.Name === g));
        for (const layer of layers) {
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
                layer.PoseMapping[pose]
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
     * @return {HTMLCanvasElement}
     */
    get result() {
        return this._canvas;
    }

    /**
     * @param {Character} C
     */
    draw(C) {
        const newState = this._calState(C);
        if (C.MustDraw || !this._state || !this._stateCompare(newState, this._state)) {
            const ctx = this._canvas.getContext("2d");
            if (!ctx) return;
            ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
            for (const [url, x, y] of newState) {
                DrawImageEx(url, ctx, x, y - CanvasUpperOverflow);
            }
            this._state = newState;
        }
    }
}
