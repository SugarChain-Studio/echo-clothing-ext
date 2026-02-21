import { ImageMapTools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { CustomValidate } from "../../../lib";

/**
 * @typedef {Object} HelperAssetDefinition
 * @property {string} name
 * @property {Translation.Entry} translation
 * @property {string} [previewSrc]
 */

/** @type {HelperAssetDefinition[]} */
const assets = [
    {
        name: "抓住推车",
        translation: { CN: "抓住推车", EN: "Grabbed Trolley" },
        previewSrc: ImageMapTools.assetPreview("ItemDevices", "Trolley"),
    },
    {
        name: "抓住行李箱",
        translation: { CN: "抓住行李箱", EN: "Grabbed Luggage" },
    },
    {
        name: "抓住硬壳行李箱",
        translation: { CN: "抓住硬壳行李箱", EN: "Grabbed Hard-Shell Luggage" },
    },
    {
        name: "抓住宠物箱",
        translation: { CN: "抓住宠物箱", EN: "Grabbed Pet Carrier" },
    },
];

const asset = {
    Random: false,
    Visible: false,
    Value: -1, // 使用这个数据来让物品在列表不显示
};

export default function () {
    const assetsN = assets.map(
        (a) =>
            /** @type {AddAssetWithConfigParamsNoGroup}*/ ([
                {
                    Name: a.name,
                    ...asset,
                },
                { translation: a.translation },
            ])
    );

    AssetManager.addAssetWithConfig("ItemMisc", assetsN);

    for (const a of assets) {
        CustomValidate.remove("ItemMisc", a.name);
    }

    AssetManager.addImageMapping(
        Object.fromEntries(
            assets
                .filter((a) => a.previewSrc)
                .map((a) => [ImageMapTools.assetPreview("ItemMisc", a.name), a.previewSrc])
        )
    );
}
