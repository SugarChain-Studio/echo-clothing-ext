import { ImageMapTools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";

const asset = {
    Random: false,
    Visible: false,
    Value: -1, // 使用这个数据来让物品在列表不显示
};

const assetName = /** @type {const} */ (["拉紧的牵绳_Luzi", "拉紧的链子_Luzi"]);

const translation = {
    拉紧的牵绳_Luzi: {
        CN: "拉紧的牵绳",
        EN: "Pulled Leash",
        RU: "Потянутый повод",
    },
    拉紧的链子_Luzi: {
        CN: "拉紧的链子",
        EN: "Pulled Chain",
        RU: "Потянутая цепь",
    },
};

const nAsset = {
    拉紧的牵绳_Luzi: "CollarLeash",
    拉紧的链子_Luzi: "ChainLeash",
};

/** @type {AssetGroupItemName[]} */
const groups = ["ItemMisc", "ItemHandheld"];

const assets = assetName.map(
    (name) =>
        /** @type {AddAssetWithConfigParams} */ ([groups, { ...asset, Name: name }, { translation: translation[name] }])
);

export default function () {
    AssetManager.addAssetWithConfig(assets);

    AssetManager.addImageMapping(
        Object.fromEntries(
            assetName.flatMap((a) =>
                groups.map((g) => [
                    ImageMapTools.assetPreview(g, a),
                    ImageMapTools.assetPreview("ItemNeckRestraints", nAsset[a]),
                ])
            )
        )
    );
}
