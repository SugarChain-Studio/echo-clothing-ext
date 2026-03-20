import { AssetManager } from "../../assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";

export default function () {
    HookManager.hookFunction("InventoryGetRandom", 0, (args, next) => {
        const assetList = args[2];
        if (assetList !== null) {
            const filtered = assetList.filter((a) => !AssetManager.assetIsCustomed(a));
            args[2] = filtered;
        }
        return next(args);
    });
}
