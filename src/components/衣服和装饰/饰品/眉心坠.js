import { AssetManager } from "../../../assetForward";

/** @type { AddAssetWithConfigParams }} */
const asset = [
    ["Mask", "ClothAccessory", "HairAccessory1", "HairAccessory3"],
    {
        Name: "眉心坠",
        Random: false,
        Left: 190,
        Top: 100,
        ParentGroup: {},
        PoseMapping: {},
        DefaultColor: ["#966C2D", "#368DBF", "#368DBF", "Default"],
        DynamicGroupName: "Mask",
        Layer: [
            { Name: "金属d" },
            { Name: "金属g", BlendingMode: "screen", AllowColorize: false },
            { Name: "宝石副d" },
            { Name: "宝石副g", BlendingMode: "screen", AllowColorize: false },
            { Name: "宝石主d" },
            { Name: "宝石主g", BlendingMode: "screen", AllowColorize: false },
            { Name: "宝石金属d", CopyLayerColor: "金属d" },
            { Name: "宝石金属g", BlendingMode: "screen", AllowColorize: false },
            { Name: "珍珠d" },
        ],
    },
    {
        translation: { CN: "眉心坠", EN: "Forehead Jewelry" },
        layerNames: {
            CN: { 金属d: "金属", 宝石副d: "小宝石", 宝石主d: "中心宝石", 珍珠d: "珍珠" },
            EN: { 金属d: "Metal", 宝石副d: "Small Gem", 宝石主d: "Main Gem", 珍珠d: "Pearl" },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
