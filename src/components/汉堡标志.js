import { AssetManager } from "../assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { ModInfo } from "@mod-utils/rollupHelper";
import { makeTooltipIcon } from "@mod-utils/Tooltip";

export const hanburgerIcon = `data:image/png;base64,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`;

export default function () {
    const iconSize = 50;
    const margin = 5;
    const hoverText = ModInfo.name;

    /** @type {import("@sugarch/bc-mod-hook-manager").HookManagerInterface.InjectFunction<"DrawAssetPreview">} */
    const func = (args, _) => {
        const [x, y, asset, { Width, Height }] = args;
        if (AssetManager.assetIsCustomed(asset)) {
            const iconX = x + (Width || DrawAssetPreviewDefaultWidth) - iconSize - margin;
            const iconY = y + (Height || DrawAssetPreviewDefaultHeight) - iconSize - margin - 40;

            DrawImageResize(hanburgerIcon, iconX, iconY, iconSize, iconSize);
            if (MouseIn(iconX, iconY, iconSize * 0.9, iconSize * 0.9)) {
                DrawHoverElements.push(() => DrawButtonHover(iconX, iconY, 100, 65, hoverText));
            }
        }
    };

    HookManager.progressiveHook("DrawAssetPreview", 1)
        .inside("AppearanceRun")
        .next()
        .when(() => CharacterAppearanceMode === "Cloth")
        .inject(func);

    HookManager.hookFunction("ElementButton.CreateForAsset", 0, (args, next) => {
        const _args = /** @type {any[]} */ (args);
        const asset = "Asset" in _args[1] ? _args[1].Asset : _args[1];

        const ret = /** @type {HTMLButtonElement} */ (next(args));

        if (AssetManager.assetIsCustomed(asset)) {
            ret.appendChild(makeTooltipIcon(ModInfo.name, hanburgerIcon));
        }
        return ret;
    });
}
