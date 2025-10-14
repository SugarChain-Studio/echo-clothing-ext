import { ImageMapTools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";

/**
 * @typedef {Object} HelperAssetDefinition
 * @property {string} name
 * @property {Translation.Entry} translation
 * @property {string} previewSrc
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
        previewSrc: ImageMapTools.assetPreview("ItemDevices", "行李箱"),
    },
];

const asset = {
    Random: false,
    Visible: false,
    Value: -1, // 使用这个数据来让物品在列表不显示
    RemoveAtLogin: true,
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

    AssetManager.addImageMapping(
        Object.fromEntries(assets.map((a) => [ImageMapTools.assetPreview("ItemMisc", a.name), a.previewSrc]))
    );
}
