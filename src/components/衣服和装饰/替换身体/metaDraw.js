/**
 * @typedef {object} PartialDrawCanvasCache
 * @property {HTMLCanvasElement} [DrawCanvas]
 * @property {HTMLCanvasElement} [Canvas]
 * @property {HTMLCanvasElement} [CanvasBlink]
 */

/**
 * @typedef {object} AdjustCanvasAlphaCache
 * @property {HTMLCanvasElement} [AdjustedCanvas]
 */

/**
 * 通用缓存数据容器基类
 * @template {object} T
 */
export class CacheData {
    constructor() {
        /** @type {Record<string, T>} */
        this.storage = {};
    }

    /**
     * @param {string} key
     * @returns {T}
     */
    get(key) {
        return (this.storage[key] ??= /** @type {T} */ ({}));
    }
}

/**
 * @extends {CacheData<PartialDrawCanvasCache>}
 */
export class PartialDrawCanvasCacheData extends CacheData {}

/**
 * @extends {CacheData<AdjustCanvasAlphaCache>}
 */
export class AdjustedCanvasCacheData extends CacheData {}

/** @type {(canvas: HTMLCanvasElement) => void} */
const clear = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

/**
 * 绘制其他身体部位
 * @param {Character} C
 * @param {Asset} TempCanvasAsset
 * @param {CustomGroupName[]} DrawGroupNames
 * @param {PartialDrawCanvasCache} cache
 * @param {(arg: {Canvas: HTMLCanvasElement, CanvasBlink: HTMLCanvasElement}) => void} [beforeDraw]
 */
export function partialDraw(C, TempCanvasAsset, DrawGroupNames, cache, beforeDraw) {
    cache.DrawCanvas ??= AnimationGenerateTempCanvas(C, TempCanvasAsset, CanvasDrawWidth, CanvasDrawHeight);
    cache.Canvas ??= AnimationGenerateTempCanvas(C, TempCanvasAsset, CanvasDrawWidth, CanvasDrawHeight);
    cache.CanvasBlink ??= AnimationGenerateTempCanvas(C, TempCanvasAsset, CanvasDrawWidth, CanvasDrawHeight);

    const oldDrawCanvas = GLDrawCanvas;
    GLDrawCanvas = cache.DrawCanvas;

    /** @type {Character} */
    const copyC = {
        ...C,
        CharacterID: "npc-partial-draw",
        Appearance: C.Appearance.filter((a) => DrawGroupNames.includes(a.Asset.Group.Name)),
    };

    copyC.Canvas = cache.Canvas;
    copyC.CanvasBlink = cache.CanvasBlink;

    clear(copyC.Canvas);
    clear(copyC.CanvasBlink);

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
 * @param {AdjustCanvasAlphaCache} cache - 用于存储调整后的 Canvas
 * @returns {HTMLCanvasElement} - 调整后的 Canvas
 */
export function adjustCanvasAlpha(c, asset, canvas, alphaMultiplier, cache) {
    // 创建一个新的 Canvas
    cache.AdjustedCanvas ??= AnimationGenerateTempCanvas(c, asset, canvas.width, canvas.height);

    clear(cache.AdjustedCanvas);

    const context = cache.AdjustedCanvas.getContext("2d");

    // 设置透明度并绘制原始 Canvas
    context.globalAlpha = alphaMultiplier;
    context.drawImage(canvas, 0, 0);

    return cache.AdjustedCanvas;
}
