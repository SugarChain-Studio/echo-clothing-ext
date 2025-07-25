import { AssetManager } from "../../../assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";

export default function () {
    AssetManager.addAsset(
        "ItemMisc",
        {
            Name: "扛起来的麻袋_Luzi",
            Random: false,
            Visible: false,
            NotVisibleOnScreen: ["LuziScreen"], // 使用这个数据来让物品在列表不显示
        },
        undefined,
        {
            CN: "扛起来的麻袋",
            EN: "Carried sack",
            RU: "Несущий мешок",
        }
    );

    AssetManager.addImageMapping({
        "Assets/Female3DCG/ItemMisc/Preview/扛起来的麻袋_Luzi.png":
            "Assets/Female3DCG/ItemDevices/Preview/BurlapSack.png",
    });

    HookManager.progressiveHook("InventoryItemHasEffect")
        .inside("ChatRoomCanBeLeashedBy")
        .override((args, next) => {
            const [Item, Effect] = args;
            if (Item.Asset.Name === "BurlapSack" && Effect === "Leash") return true;
            return next(args);
        });
}
