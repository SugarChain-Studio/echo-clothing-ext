import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { sleepUntil } from "@sugarch/bc-mod-utility";
import { AssetManager } from "@local/AssetManager";
import { AfterAssetOverrides } from "./afterAssetOverrides";

/**
 * 已注册的运行时资源（ImageMapping 之前的地址）。
 * @type {Set<string>}
 */
const registeredAssets = new Set();

let initialized = false;

const globalObj = /** @type {any} */ (globalThis);

/**
 * ImageCache 不会自行应用 ImageMapping，因此写入或查找缓存前需要先解析出最终地址。
 *
 * `mapImgSrc` 对无需映射的地址（已是最终地址、blob:、data:、http 等）会原样返回，
 * 可直接串联到后续的缓存操作中。
 * @param {string} url
 * @returns {string}
 */
function resolveAssetURL(url) {
    return AssetManager.imageMapping.storage.mapImgSrc(url);
}

/**
 * @returns {{ has(url: string): boolean; get(url: string): unknown }[]}
 */
function imageCaches() {
    return [globalObj.DrawImageCache, globalObj.GLDrawImageCache].filter(
        (cache) => cache && typeof cache.has === "function"
    );
}

/** @param {string} url */
function preloadAsset(url) {
    const resolved = resolveAssetURL(url);
    if (GLDrawCanvas) GLDrawLoadImage(GLDrawCanvas.GL, resolved);
    if (globalObj.DrawImageCache) DrawGetImage(resolved);
}

/**
 * 注册运行时资源：初始化完成后预载进图片缓存，并跟随游戏的保活节奏保持常驻。
 * @param {string} url
 */
function registerDynamicAsset(url) {
    if (registeredAssets.has(url)) return;
    registeredAssets.add(url);
    if (initialized) preloadAsset(url);
}

AfterAssetOverrides.register(() => {
    HookManager.afterInit(() => {
        initialized = true;
        const pending = Array.from(registeredAssets);
        sleepUntil(() => !!GLDrawCanvas, 100).then(() => {
            pending.forEach((url) => GLDrawLoadImage(GLDrawCanvas.GL, resolveAssetURL(url)));
        });
        sleepUntil(() => !!globalObj.DrawImageCache, 100).then(() => {
            pending.forEach((url) => DrawGetImage(resolveAssetURL(url)));
        });
    });
});

// 游戏清理缓存前会调用 CommonDrawWarmDrawnAssets 重新标记角色用到的图片，
// 这里把注册的资源一并标记，避免它们因长时间未被使用而被逐出缓存。
// @ts-ignore: bc-stubs 仍是 R132，尚未包含该函数
HookManager.hookFunction("CommonDrawWarmDrawnAssets", 0, (args, next) => {
    const caches = imageCaches();
    if (caches.length > 0) {
        for (const url of Array.from(registeredAssets)) {
            const resolved = resolveAssetURL(url);
            for (const cache of caches) {
                if (cache.has(resolved)) cache.get(resolved);
            }
        }
    }
    return next(args);
});

export { registerDynamicAsset };
