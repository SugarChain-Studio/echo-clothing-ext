/**
 * 绘制其他身体部位
 * @param {Character} C
 * @param {Asset} TempCanvasAsset
 * @param {CustomGroupName[]} DrawGroupNames
 * @param {(arg: {Canvas: HTMLCanvasElement, CanvasBlink: HTMLCanvasElement}) => void} [beforeDraw]
 */
export function partialDraw(C, TempCanvasAsset, DrawGroupNames, beforeDraw) {
    const oldDrawCanvas = GLDrawCanvas;

    GLDrawCanvas = customTempCanvas(C, TempCanvasAsset, CanvasDrawWidth, CanvasDrawHeight, "GLDrawCanvas");
    /** @type {Character} */
    const copyC = {
        ...C,
        CharacterID: "npc-partial-draw",
        Appearance: C.Appearance.filter((a) => DrawGroupNames.includes(a.Asset.Group.Name)),
    };
    copyC.Canvas = customTempCanvas(C, TempCanvasAsset, CanvasDrawWidth, CanvasDrawHeight, "Canvas");
    copyC.CanvasBlink = customTempCanvas(C, TempCanvasAsset, CanvasDrawWidth, CanvasDrawHeight, "CanvasBlink");

    if (beforeDraw) beforeDraw({ Canvas: copyC.Canvas, CanvasBlink: copyC.CanvasBlink });

    copyC.DrawAppearance = AppearanceItemParse(CharacterAppearanceStringify(copyC));
    copyC.AppearanceLayers = CharacterAppearanceSortLayers(copyC);
    copyC.Appearance = C.Appearance;

    CharacterAppearanceBuildCanvas(copyC);

    GLDrawCanvas = oldDrawCanvas;
    return { Canvas: copyC.Canvas, CanvasBlink: copyC.CanvasBlink };
}

/**
 * 调整 Canvas 的透明度
 * @param {Character} c
 * @param {Asset} asset
 * @param {HTMLCanvasElement} canvas - 原始 Canvas
 * @param {number} alphaMultiplier - 透明度乘数（0 到 1）
 * @returns {HTMLCanvasElement} - 调整后的 Canvas
 */
export function adjustCanvasAlpha(c, asset, canvas, alphaMultiplier) {
    // 创建一个新的 Canvas
    const adjustedCanvas = customTempCanvas(c, asset, canvas.width, canvas.height, "adjustedCanvas");
    const context = adjustedCanvas.getContext("2d");

    // 设置透明度并绘制原始 Canvas
    context.globalAlpha = alphaMultiplier;
    context.drawImage(canvas, 0, 0);

    return adjustedCanvas;
}

/**
 *
 * @param {Character} C
 * @param {Asset} A
 * @param {Number} width
 * @param {Number} height
 * @param {string} suffix
 * @returns
 */
export function customTempCanvas(C, A, width, height, suffix) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("name", `${AnimationGetDynamicDataName(C, AnimationDataTypes.Canvas, A)}__${suffix}`);
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
