import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type { AddAssetWithConfigParams[] }} */
const assets = [
    [
        ["Mask", "ClothAccessory", "HairAccessory1", "HairAccessory3"],
        {
            Name: "蝴蝶结头饰小",
            Random: false,
            Top: 20,
            Left: 185,
            DynamicGroupName: "Mask",
        },
        { translation: { CN: "蝴蝶结头饰小", EN: "Small Bow Hair Accessory" } },
    ],
];

/** @type { AddAssetWithConfigParams[] }} */
const assets2 = [
    [
        ["Mask", "ClothAccessory", "HairAccessory1", "HairAccessory3"],
        {
            Name: "蝴蝶结头饰大",
            Random: false,
            Top: 0,
            Left: 165,
            DynamicGroupName: "Mask",
        },
        { translation: { CN: "蝴蝶结头饰大", EN: "Large Bow Hair Accessory" } },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(assets);
    for (const asset of assets) {
        luziSuffixFixups(asset[0], asset[1].Name);
    }
    AssetManager.addAssetWithConfig(assets2);
    for (const asset of assets2) {
        luziSuffixFixups(asset[0], asset[1].Name);
    }
}
