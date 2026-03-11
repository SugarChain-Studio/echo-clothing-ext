import { AssetManager } from "../../../assetForward";

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
}
