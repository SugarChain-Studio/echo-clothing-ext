import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { onImageRefresh } from "./lib/imageRefresh";

/**
 * R133+: the game works out which asset a loaded image belongs to from the URL's pathname, which is
 * percent-encoded, so images with non-ASCII file names never match and characters are not redrawn.
 * ModSDK cannot patch the class method that does this, so redo the match here with the decoded path.
 * @param {string} url
 */
function refreshForDecodedPath(url) {
    const raw = new URL(url, location.href).pathname;
    let path;
    try {
        path = decodeURI(raw);
    } catch {
        return;
    }
    // Nothing was encoded, so the game has already handled this image
    if (path === raw) return;

    const parts = path.split("/");
    let pos = parts.indexOf("Assets");
    if (pos === -1 || parts[++pos] !== "Female3DCG") return;

    let groupName = parts[++pos];
    if (groupName === "Override") {
        pos += 2;
        groupName = parts[pos];
    }
    let layerName = parts[++pos];
    if (layerName && !layerName.endsWith(".png")) layerName = parts[++pos];
    if (!groupName || !layerName) return;

    const assetName = layerName.split("_")[0].replace(".png", "");
    for (const C of Character) {
        if (
            C.Appearance.some(
                (item) =>
                    (item.Asset.Group.Name === groupName || item.Asset.DynamicGroupName === groupName) &&
                    item.Asset.Name === assetName
            )
        ) {
            C.MustDraw = true;
        }
    }
}

export default function () {
    HookManager.patchFunction("CharacterCheckHooks", {
        '(Layer.Visibility == "OthersExceptDialog" && !(inDialog && !C.IsPlayer()))':
            '(Layer.Visibility == "OthersExceptDialog" && !inDialog && !C.IsPlayer())',
    });

    if (typeof (/** @type {any} */ (globalThis).DrawRefreshCharacterForImage) === "function") {
        // R132 and earlier
        HookManager.patchFunction("DrawRefreshCharacterForImage", {
            "const path = url.pathname;": "const path = decodeURI(url.pathname);",
        });
    } else {
        // R133+
        onImageRefresh(refreshForDecodedPath);
    }
}
