import { AssetManager } from "../../../assetForward";
import { DrawCharacterModifier, ChatRoomOrder } from "@mod-utils/ChatRoomOrder";

const asset = {
    Name: "拉紧的牵绳_Luzi",
    Random: false,
    Value: -1,
    Visible: false,
    NotVisibleOnScreen: ["LuziScreen"], // 使用这个数据来让物品在列表不显示
};

const translations = {
    CN: "拉紧的牵绳",
    EN: "Pulled Leash",
    RU: "Потянутый повод",
};

export default function () {
    AssetManager.addAsset("ItemHandheld", asset, undefined, translations);
    AssetManager.addAsset("ItemHandheld", { ...asset, Name: "拉紧的链子_Luzi" }, undefined, translations);

    AssetManager.addImageMapping({
        "Assets/Female3DCG/ItemHandheld/Preview/拉紧的牵绳_Luzi.png":
            "Assets/Female3DCG/ItemNeckRestraints/Preview/CollarLeash.png",
        "Assets/Female3DCG/ItemHandheld/Preview/拉紧的链子_Luzi.png":
            "Assets/Female3DCG/ItemNeckRestraints/Preview/CollarLeash.png",
    });

    DrawCharacterModifier.addModifier((C, arg) => {
        const { Zoom } = arg;
        const sharedC = ChatRoomOrder.requireSharedCenter(C);
        if (!sharedC) return arg;

        const assetName = sharedC.prev.XCharacterDrawOrder.associatedAsset?.asset;

        if (assetName !== "CollarLeash" && assetName !== "拉紧的牵绳_Luzi" && assetName !== "拉紧的链子_Luzi")
            return arg;

        if (sharedC.prev.MemberNumber === C.MemberNumber) {
            return { X: sharedC.center.X - 150 * Zoom, Y: sharedC.center.Y, Zoom };
        }

        if (sharedC.next.MemberNumber === C.MemberNumber) {
            return { X: sharedC.center.X, Y: sharedC.center.Y, Zoom };
        }
    });
}
