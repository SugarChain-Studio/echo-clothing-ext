import { AssetManager } from "../../../assetForward";

/** @type { AddAssetWithConfigParamsNoGroup[] } */
const accessories = [
    [
        {
            Name: "耳朵1_Luzi",
            Random: false,
            DynamicGroupName: "HairAccessory1",
            Top: -40,
            Left: 90,
            Priority: 20,
            DefaultColor: ["#7A4646", "#888888", "#0F0F0F"],
            Layer: [{ Name: "内圈" }, { Name: "绒毛" }, { Name: "外圈" }],
        },
        {
            translation: { CN: "耳朵 1", EN: "Ears 1", RU: "Уши 1" },
            layerNames: { EN: { 内圈: "Inner", 绒毛: "Fur", 外圈: "Outer" } },
        },
    ],
    [
        {
            Name: "耳朵2_Luzi",
            Random: false,
            DynamicGroupName: "HairAccessory1",
            Top: 0,
            Left: 90,
            Priority: 20,
            DefaultColor: ["#916A6A", "#888888", "#917451"],
            Layer: [{ Name: "内圈" }, { Name: "绒毛" }, { Name: "外圈" }],
        },
        {
            translation: { CN: "耳朵 2", EN: "Ears 2", RU: "Уши 2" },
            layerNames: { EN: { 内圈: "Inner", 绒毛: "Fur", 外圈: "Outer" } },
        },
    ],
    [
        {
            Name: "角7_Luzi",
            Random: false,
            DynamicGroupName: "HairAccessory1",
            Top: 0,
            Left: 0,
            Priority: 52,
        },
        {
            translation: { CN: "角 7", EN: "Horn 7", RU: "Рог 7" },
        },
    ],
    [
        {
            Name: "精灵耳2_Luzi",
            Random: false,
            DynamicGroupName: "HairAccessory1",
            Top: 0,
            Left: 90,
            Priority: 51,
            InheritColor: "BodyUpper",
            ColorSuffix: { HEX_COLOR: "White" },
        },
        { translation: { CN: "精灵耳 2", EN: "Elf Ears 2" } },
    ],
    [
        {
            Name: "小马耳2_Luzi",
            Random: false,
            DynamicGroupName: "HairAccessory1",
            Top: 0,
            Left: 90,
        },
        { translation: { CN: "小马耳 2", EN: "Pony Ears 2" } },
    ],
    [
        {
            Name: "鱼鳍耳朵_Luzi",
            Random: false,
            DynamicGroupName: "HairAccessory1",
            Left: 160,
            Top: 150,
            Priority: 51,
            DefaultColor: ["#FFFFFF", "#888888", "#000000"],
            Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "A3" }],
        },
        {
            translation: { CN: "鱼鳍耳朵", EN: "Fish Fin Ears" },
            layerNames: {
                CN: { A1: "底色", A2: "加深", A3: "鱼鳍骨" },
                EN: { A1: "Base", A2: "Darkening", A3: "Fin Bones" },
            },
        },
    ],
    [
        {
            Name: "耷拉下来的耳朵_Luzi",
            Random: false,
            DynamicGroupName: "HairAccessory1",
            Left: 140,
            Top: 70,
            Priority: 51,
        },
        {
            translation: { CN: "耷拉兔耳", EN: "Droopy Bunny Ears" },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(["HairAccessory1", "HairAccessory2"], accessories);
}
