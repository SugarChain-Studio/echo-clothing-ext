import { AssetManager } from "../../../assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { CustomValidate } from "../../../lib";

export default function () {
    AssetManager.addAsset(
        "ItemMisc",
        {
            Name: "扛起来的麻袋",
            Random: false,
            Visible: false,
            Value: -1, // 使用这个数据来让物品在列表不显示
        },
        undefined,
        {
            CN: "扛起来的麻袋",
            EN: "Carried sack",
            RU: "Несущий мешок",
        }
    );

    CustomValidate.remove("ItemMisc", "扛起来的麻袋");

    AssetManager.addImageMapping({
        "Assets/Female3DCG/ItemMisc/Preview/扛起来的麻袋.png": "Assets/Female3DCG/ItemDevices/Preview/BurlapSack.png",
    });

    HookManager.progressiveHook("InventoryItemHasEffect")
        .inside("ChatRoomCanBeLeashedBy")
        .override((args, next) => {
            const [Item, Effect] = args;
            if (Item.Asset.Name === "BurlapSack" && Effect === "Leash") return true;
            return next(args);
        });
}
