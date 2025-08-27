import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "透明兔女郎_Luzi",
    Random: false,
    Left: 160,
    Top: 300,
    Priority: 20,
    PoseMapping: {
        Hogtied: "Hogtied",
        AllFours: PoseType.HIDE,
    },
    DynamicGroupName: "Suit",
    DefaultColor: ["#111", "#111", "Default", "Default", "Default", "Default"],
    Layer: [
        { Name: "A1", Opacity: 0.4 },
        { Name: "A2" },
        { Name: "B1" },
        { Name: "B2" },
        { Name: "B3" },
        { Name: "C1" },
        {
            Name: "遮罩",
            BlendingMode: "destination-out",
            TextureMask: {
                Groups: [
                    "BodyUpper",
                    "Bra",
                    "Bra_笨笨蛋Luzi",
                    "SuitLower",
                    "SuitLower_笨笨蛋Luzi",
                    "ItemTorso",
                    "ItemTorso2",
                    "Liquid2_Luzi",
                    "BodyMarkings",
                    "身体痕迹_Luzi",
                    "BodyMarkings2_Luzi",
                ],
            },
        },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "透明兔女郎",
    EN: "Transparent Bunny Girl",
};

/** @type {Translation.String} */
const layerNames = {
    CN: {
        A1: "中间底色",
        A2: "两侧底色",
        B1: "色调亮部",
        B2: "腹部高光",
        B3: "胸反光",
        C1: "边缘线",
    },
    EN: {
        A1: "Middle Base Color",
        A2: "Side Base Color",
        B1: "Tone Highlight",
        B2: "Abdomen Highlight",
        B3: "Chest Reflection",
        C1: "Edge Line",
    },
};

function generate(n, def, src = {}) {
    return Array.from({ length: n }, (_, i) => (src[i] === undefined ? def : src[i]));
}

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [
        { Name: "Op1", Property: { Opacity: generate(asset.Layer.length, 1, { 0: 0.4 }) } },
        { Name: "Op2", Property: { Opacity: generate(asset.Layer.length, 1, { 0: 0.4, 1: 0 }) } },
        { Name: "NoOp", Property: { Opacity: generate(asset.Layer.length, 1) } },
    ],
};

const assetStrings = {
    CN: {
        Select: "选择透明兔女郎样式",
        Op1: "中间透明",
        Op2: "整体透明",
        NoOp: "不透明",
    },
    EN: {
        Select: "Select Transparent Bunny Girl Style",
        Op1: "Middle Trans",
        Op2: "Overall Trans",
        NoOp: "Opaque",
    },
};

export default function () {
    for (const g of /** @type {CustomGroupBodyName[]}*/ (["Suit", "Bra", "Cloth"])) {
        AssetManager.addAssetWithConfig(g, asset, { translation, layerNames, extended, assetStrings });
    }
}
