import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type { AddAssetWithConfigParams[] }} */
const assets = [
    [
        ["ClothOuter", "ClothLower", "Cloth"],
        {
            Name: "系腰外套小",
            Random: false,
            Top: 400,
            Left: 153,
            DynamicGroupName: "ClothOuter",
            ParentGroup: {},
            PoseMapping: {},
            Layer: [
                { Name: "A1", Priority: 5 },
                { Name: "A2", Priority: 27 },
            ],
        },
        { translation: { CN: "系腰外套小", EN: "Small Waist-Tied Outerwear" } },
    ],
];

/** @type { AddAssetWithConfigParams[] }} */
const assets2 = [
    [
        ["ClothOuter", "ClothLower", "Cloth"],
        {
            Name: "系腰外套大",
            Random: false,
            Top: 400,
            Left: 115,
            DynamicGroupName: "ClothOuter",
            ParentGroup: {},
            PoseMapping: {},
            Layer: [
                { Name: "A1", Priority: 5 },
                { Name: "A2", Priority: 27 },
            ],
        },
        { translation: { CN: "系腰外套大", EN: "Large Waist-Tied Outerwear" } },
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
