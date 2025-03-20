import { AssetManager } from "../../../assetForward";
import { DrawCharacterModifier } from "@mod-utils/ChatRoomOrder";
import { ChatRoomOrder } from "@mod-utils/ChatRoomOrder/roomOrder";
import { HookManager } from "@sugarch/bc-mod-hook-manager";

export default function () {
    AssetManager.addAsset(
        "ItemMisc",
        {
            Name: "扛起来的麻袋_Luzi",
            Random: false,
            Value: -1,
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

    DrawCharacterModifier.addModifier((C, arg) => {
        const { Zoom } = arg;
        const sharedC = ChatRoomOrder.requireSharedCenter(C);
        if (!sharedC) return arg;

        if (
            sharedC.prev.XCharacterDrawOrder.associatedAsset?.asset !== "BurlapSack" ||
            sharedC.next.XCharacterDrawOrder.associatedAsset?.asset !== "扛起来的麻袋_Luzi"
        )
            return arg;

        if (sharedC.prev.MemberNumber === C.MemberNumber) {
            if (sharedC.next.ActivePose[0] === "Kneel" || sharedC.next.ActivePose[0] === "KneelingSpread") {
                return { X: sharedC.center.X, Y: sharedC.center.Y - 120 * Zoom, Zoom };
            } else {
                return { X: sharedC.center.X, Y: sharedC.center.Y - 340 * Zoom, Zoom };
            }
        }

        if (sharedC.next.MemberNumber === C.MemberNumber) {
            return { X: sharedC.center.X, Y: sharedC.center.Y, Zoom };
        }
    });
}
