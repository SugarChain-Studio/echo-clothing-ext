import { AssetManager } from "../../../assetForward";

const asset = {
    Name: "拉紧的牵绳_Luzi",
    Random: false,
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
            "Assets/Female3DCG/ItemNeckRestraints/Preview/ChainLeash.png",
    });
}
