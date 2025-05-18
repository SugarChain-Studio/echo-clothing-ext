import { HookManager } from "@sugarch/bc-mod-hook-manager";

export default function () {
    return;
    HookManager.hookFunction("InventoryPrerequisiteMessage", 0, (args, next) => {
        if (/** @type {CustomAssetPrerequisite}*/ (args[1]) === "LuziOnCross") {
            return !InventoryIsItemInList(args[0], "ItemDevices", ["X-Cross"]) ? "Must be on X-Cross" : "";
        }

        return next(args);
    });
}
