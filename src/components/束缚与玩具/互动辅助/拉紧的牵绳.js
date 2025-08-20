import { AssetManager } from "../../../assetForward";

const asset = {
    Random: false,
    Visible: false,
    Value: -1, // 使用这个数据来让物品在列表不显示
};

const translations = {
    CN: "拉紧的牵绳",
    EN: "Pulled Leash",
    RU: "Потянутый повод",
};

/** @type {AssetGroupItemName[]} */
const groups = ["ItemMisc", "ItemHandheld"];

export default function () {
    for (const group of groups) {
        ["拉紧的牵绳_Luzi", "拉紧的链子_Luzi"]
            .map((Name) => ({ ...asset, Name }))
            .forEach((asset) => {
                AssetManager.addAsset(group, asset, undefined, translations);
            });

        AssetManager.addImageMapping({
            [`Assets/Female3DCG/${group}/Preview/拉紧的牵绳_Luzi.png`]:
                "Assets/Female3DCG/ItemNeckRestraints/Preview/CollarLeash.png",
            [`Assets/Female3DCG/${group}/Preview/拉紧的链子_Luzi.png`]:
                "Assets/Female3DCG/ItemNeckRestraints/Preview/ChainLeash.png",
        });
    }
}
