import { HookManager } from "@sugarch/bc-mod-hook-manager";

/**
 * Runs `callback(url)` whenever the game refreshes characters after an image finishes loading.
 *
 * - R132 and earlier: `DrawRefreshCharacterForImage(img)`, where `img` is an HTMLImageElement.
 * - R133+: that function is gone; the logic moved to `ImageCache#_refreshCharactersForImage(img)`
 *   on `GLDrawImageCache` and `DrawImageCache`, where `img` is a CachedImage with a `url`.
 *
 * Only functions that exist are hooked, because ModSDK throws on missing ones, and a throw
 * during `HookManager.initWithMod` stops the whole mod from initialising.
 * @param {(url: string) => void} callback
 */
export function onImageRefresh(callback) {
    const G = /** @type {any} */ (globalThis);

    if (typeof G.DrawRefreshCharacterForImage === "function") {
        HookManager.hookFunction("DrawRefreshCharacterForImage", 0, (args, next) => {
            const ret = next(args);
            const src = /** @type {any} */ (args[0])?.src;
            if (typeof src === "string") callback(src);
            return ret;
        });
        return;
    }

    for (const cache of ["GLDrawImageCache", "DrawImageCache"]) {
        if (typeof G[cache]?._refreshCharactersForImage !== "function") continue;
        HookManager.hookFunction(/** @type {any} */ (`${cache}._refreshCharactersForImage`), 0, (args, next) => {
            const ret = next(args);
            const url = /** @type {any} */ (args[0])?.url;
            if (typeof url === "string") callback(url);
            return ret;
        });
    }
}
