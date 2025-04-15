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
