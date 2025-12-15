import { AssetManager } from "../../../assetForward";
import { Typing } from "../../../lib";

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        "Suit",
        {
            Name: "马油袜",
            Random: false,
            Top: 0,
            Left: 0,
            Layer: [
                { Name: "Z1" }, // 身体色晕
                { Name: "A1" }, // 底色
                { Name: "A2", ColorGroup: "Shade1" }, // 身体曲线暗色
                { Name: "A3", ColorGroup: "Shade1" },
                { Name: "A4", ColorGroup: "Shade1" },
                { Name: "B1" }, // 边缘线
                { Name: "B2" }, // 边缘暗色
                { Name: "C1", ColorGroup: "BS" }, // 身体暗色细节
                { Name: "C2", ColorGroup: "BS" },
                { Name: "C3", ColorGroup: "BS" },
                { Name: "C4", ColorGroup: "BS" },
                { Name: "C5", ColorGroup: "BS" },
                { Name: "C6", ColorGroup: "BS" },
                { Name: "C7", ColorGroup: "BS" },
                { Name: "C8", ColorGroup: "BS" },
                { Name: "C9", ColorGroup: "BS" },
                { Name: "C10", ColorGroup: "BS" },
                { Name: "C11", ColorGroup: "BS" },
                { Name: "C12", ColorGroup: "BS" },
                { Name: "D1", ColorGroup: "HL" }, // 身体高光细节
                { Name: "D2", ColorGroup: "HL" },
                { Name: "D3", ColorGroup: "HL" },
                { Name: "D4", ColorGroup: "HL" },
                { Name: "D5", ColorGroup: "HL" },
                { Name: "D6", ColorGroup: "HL" },
                { Name: "D7", ColorGroup: "HL" },
                ...Typing.layerMap(
                    [
                        { Name: "E1", CopyLayerColor: "A1" },
                        { Name: "F1", CopyLayerColor: "B1" },
                        { Name: "F2", CopyLayerColor: "B2" },
                        { Name: "G1", ColorGroup: "HL" },
                        { Name: "G2", ColorGroup: "HL" },
                    ],
                    (l) => ({ ...l, Priority: 29, CreateLayerTypes: ["h"], AllowTypes: { h: [0, 2, 3] } })
                ),
                {
                    Name: "bmask",
                    AllowTypes: { b: 1 },
                    BlendingMode: "destination-out",
                    CreateLayerTypes: ["b"],
                    TextureMask: { ApplyToAbove: true },
                },
                { Name: "bmL", CreateLayerTypes: ["b"], AllowTypes: { b: 1 }, CopyLayerColor: "B1" },
                {
                    Name: "mmask",
                    AllowTypes: { m: 1 },
                    BlendingMode: "destination-in",
                    CreateLayerTypes: ["m"],
                    TextureMask: { ApplyToAbove: true },
                },
                { Name: "mmL", CreateLayerTypes: ["m"], AllowTypes: { m: 1 }, CopyLayerColor: "B1" },
            ],
        },
        {
            translation: { CN: "油光全身袜", EN: "Glossy Bodystocking" },
            extended: {
                Archetype: "modular",
                DrawImages: false,
                Modules: [
                    { Name: "手指", Key: "h", Options: [{}, {}, {}, {}] },
                    { Name: "袖子", Key: "m", Options: [{}, {}] },
                    { Name: "胸口", Key: "b", Options: [{}, {}] },
                ],
            },
            layerNames: {
                CN: {
                    Z1: "身体色晕",
                    A1: "底色",
                    Shade1: "身体曲线暗色",
                    B1: "边缘线",
                    B2: "边缘暗色",
                    BS: "身体暗色细节",
                    HL: "身体高光细节",
                },
                EN: {
                    Z1: "Body Hue",
                    A1: "Base Color",
                    Shade1: "Body Curve Shade",
                    B1: "Edge Line",
                    B2: "Edge Shade",
                    BS: "Body Shade Details",
                    HL: "Body Highlight Details",
                },
            },
            assetStrings: {
                CN: {
                    SelectBase: "选择油光全身袜样式",

                    Module手指: "手样式",
                    Select手指: "选择手样式",
                    Optionh0: "完整手套",
                    Optionh1: "无手套",
                    Optionh2: "露指手套",
                    Optionh3: "挂中指手套",

                    Module袖子: "袖子样式",
                    Select袖子: "选择袖子样式",
                    Optionm0: "有袖",
                    Optionm1: "无袖",

                    Module胸口: "胸口样式",
                    Select胸口: "选择胸口样式",
                    Optionb0: "包覆胸口",
                    Optionb1: "露出胸口",
                },
                EN: {
                    SelectBase: "Select Glossy Bodystocking Style",

                    Module手指: "Hand Style",
                    Select手指: "Select Hand Style",
                    Optionh0: "Full Gloves",
                    Optionh1: "No Gloves",
                    Optionh2: "Fingerless Gloves",
                    Optionh3: "Cutout Gloves",

                    Module袖子: "Sleeve Style",
                    Select袖子: "Select Sleeve Style",
                    Optionm0: "With Sleeves",
                    Optionm1: "Sleeveless",

                    Module胸口: "Chest Style",
                    Select胸口: "Select Chest Style",
                    Optionb0: "Covered Chest",
                    Optionb1: "Exposed Chest",
                },
            },
        },
    ],
    [
        "SuitLower",
        {
            Name: "马油袜下",
            Random: false,
            Top: 0,
            Left: 0,
            Layer: [
                { Name: "Z1" }, // 身体色晕
                { Name: "A1" }, // 底色
                { Name: "A2", ColorGroup: "Shade1" }, // 身体曲线暗色
                { Name: "A3", ColorGroup: "Shade1" },
                { Name: "B1" }, // 边缘线
                { Name: "B2" }, // 边缘暗色
                { Name: "C1", ColorGroup: "BS" }, // 身体暗色细节
                { Name: "C2", ColorGroup: "BS" },
                { Name: "C3", ColorGroup: "BS" },
                { Name: "C4", ColorGroup: "BS" },
                { Name: "C5", ColorGroup: "BS" },
                { Name: "C6", ColorGroup: "BS" },
                { Name: "D1", ColorGroup: "HL" }, // 身体高光细节
                { Name: "D2", ColorGroup: "HL" },
                { Name: "D3", ColorGroup: "HL" },
                { Name: "D4", ColorGroup: "HL" },
                {
                    Name: "tmask",
                    AllowTypes: { t: 1 },
                    BlendingMode: "destination-out",
                    CreateLayerTypes: ["t"],
                    TextureMask: { ApplyToAbove: true },
                },
                { Name: "tmL", CreateLayerTypes: ["t"], AllowTypes: { t: 1 }, CopyLayerColor: "B1" },
            ],
        },
        {
            translation: { CN: "油光全身袜", EN: "Glossy Bodystocking" },
            extended: {
                Archetype: "modular",
                DrawImages: false,
                Modules: [{ Name: "脚趾", Key: "t", Options: [{}, {}] }],
            },
            layerNames: {
                CN: {
                    Z1: "身体色晕",
                    A1: "底色",
                    Shade1: "身体曲线暗色",
                    B1: "边缘线",
                    B2: "边缘暗色",
                    BS: "身体暗色细节",
                    HL: "身体高光细节",
                },
                EN: {
                    Z1: "Body Hue",
                    A1: "Base Color",
                    Shade1: "Body Curve Shade",
                    B1: "Edge Line",
                    B2: "Edge Shade",
                    BS: "Body Shade Details",
                    HL: "Body Highlight Details",
                },
            },
            assetStrings: {
                CN: {
                    SelectBase: "选择油光全身袜样式",

                    Module脚趾: "脚趾样式",
                    Select脚趾: "选择脚趾样式",
                    Optiont0: "完整袜子",
                    Optiont1: "露趾袜子",
                },
                EN: {
                    SelectBase: "Select Glossy Bodystocking Style",

                    Module脚趾: "Toe Style",
                    Select脚趾: "Select Toe Style",
                    Optiont0: "Full Stockings",
                    Optiont1: "Open Toe Stockings",
                },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}
