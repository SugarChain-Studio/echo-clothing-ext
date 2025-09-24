import { AssetManager } from "../../../assetForward";

/** @type { AddAssetWithConfigParams }} */
const asset = [
    "ClothAccessory",
    {
        Name: "肩章",
        Random: false,
        Left: 160,
        Top: 220,
        ParentGroup: {},
        PoseMapping: {},
        Priority: 34,
        Layer: [
            { Name: "A1", AllowTypes: { c: 0 } },
            { Name: "A2_左", AllowTypes: { t: [0, 1] }, ColorGroup: "穗" },
            { Name: "A2_右", AllowTypes: { t: [0, 2] }, ColorGroup: "穗" },
            { Name: "A3_左", AllowTypes: { t: [0, 1] }, ColorGroup: "章" },
            { Name: "A3_右", AllowTypes: { t: [0, 2] }, ColorGroup: "章" },
        ],
    },
    {
        translation: {
            CN: "肩章",
            EN: "Epaulet",
        },
        layerNames: {
            CN: {
                A1: "链子",
                A2_左: "左",
                A2_右: "右",
                A3_左: "左",
                A3_右: "右",

                穗: "穗",
                章: "章",
            },
            EN: {
                A1: "Chain",
                A2_左: "Left",
                A2_右: "Right",
                A3_左: "Left",
                A3_右: "Right",
                穗: "Tassel",
                章: "Badge",
            },
        },
        extended: {
            Archetype: ExtendedArchetype.MODULAR,
            DrawImages: false,
            Modules: [
                { Name: "链", Key: "c", Options: [{}, {}] },
                { Name: "章", Key: "t", Options: [{}, {}, {}] },
            ],
        },
        assetStrings: {
            CN: {
                SelectBase: "配置肩章样式",

                Module链: "链子",
                Select链: "选择链子样式",
                Optionc0: "有链子",
                Optionc1: "无链子",

                Module章: "肩章",
                Select章: "选择肩章组合",
                Optiont0: "两侧都有",
                Optiont1: "左侧",
                Optiont2: "右侧",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
