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

export default function () {
    for (const n of /** @type {CustomGroupBodyName[]}*/ (["Suit", "Bra", "Cloth"])) {
        AssetManager.addAssetWithConfig(n, { ...asset, DynamicGroupName: "Suit" }, { translation, layerNames });
    }
}
