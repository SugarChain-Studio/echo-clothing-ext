import { AssetManager } from "@local/AssetManager";
import { Layer } from "@local/lib/type";

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
        Priority: 53,
        DynamicGroupName: "Mask",
        Layer: [
            { Color: ["#966C2D"], Name: "金属d" },
            Layer.screen({ Name: "金属g" }),
            { Color: ["#368DBF"], Name: "宝石副d" },
            Layer.screen({ Name: "宝石副g" }),
            { Color: ["#368DBF"], Name: "宝石主d" },
            Layer.screen({ Name: "宝石主g" }),
            { Name: "宝石金属d", CopyLayerColor: "金属d" },
            Layer.screen({ Name: "宝石金属g" }),
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
