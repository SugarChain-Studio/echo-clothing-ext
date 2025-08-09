import { AssetManager } from "../../../assetForward";

/** @type {Partial<AssetLayerDefinition>} */
const gloveLayerInfo = {
    Priority: 27,
    AllowTypes: { typed: 1 },
    PoseMapping: {
        TapedHands: "TapedHands",
        Yoked: "Yoked",
        OverTheHead: "OverTheHead",
        BackBoxTie: "Hide",
        BackElbowTouch: "Hide",
        BackCuffs: "BackCuffs",
        Hogtied: "Hide",
        AllFours: "Hide",
    },
};

/** @type {Partial<AssetLayerDefinition>} */
const upperLayerInfo = {
    Priority: 14,
    PoseMapping: {
        TapedHands: "TapedHands",
        Yoked: "Yoked",
        OverTheHead: "OverTheHead",
        BackBoxTie: "BackBoxTie",
        BackElbowTouch: "BackElbowTouch",
        BackCuffs: "BackCuffs",
        Hogtied: "Hogtied",
        AllFours: "Hide",
    },
};

/** @type {Partial<AssetLayerDefinition>} */
const lowerLayerInfo = {
    Priority: 14,
    PoseMapping: {
        Kneel: "Kneel",
        KneelingSpread: "KneelingSpread",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        Hogtied: "Hogtied",
        AllFours: "Hide",
    },
};

/** @type {CustomAssetDefinition} */
const assetUpper = {
    Name: "乳胶衣_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Prerequisite: ["HasBreasts"],
    Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"],
    DefaultColor: ["#232323", "#000000", "#FFFFFF", "#232323", "#000000", "#FFFFFF"],
    Layer: [
        { Name: "手套底色", ...gloveLayerInfo, ColorGroup: "Base" },
        { Name: "手套阴影", ...gloveLayerInfo, ColorGroup: "Shadow" },
        { Name: "手套高光", ...gloveLayerInfo, ColorGroup: "Highlight" },
        { Name: "上底色", ...upperLayerInfo, ColorGroup: "Base" },
        { Name: "上阴影", ...upperLayerInfo, ColorGroup: "Shadow" },
        { Name: "上高光", ...upperLayerInfo, ColorGroup: "Highlight" },
    ],
};

/** @type {CustomAssetDefinition} */
const assetLower = {
    Name: "乳胶衣_Luzi",
    Random: false,
    Gender: "F",
    Top: {
        "": 0,
        "Hogtied": 380,
    },
    Left: 0,
    Prerequisite: ["HasVagina"],
    Attribute: ["SuitLower"],
    DefaultColor: ["#232323", "#000000", "#FFFFFF"],
    Layer: [
        { Name: "下底色", ...lowerLayerInfo },
        { Name: "下阴影", ...lowerLayerInfo },
        { Name: "下高光", ...lowerLayerInfo },
        {
            Name: "袜遮罩",
            AllowTypes: { typed: 0 },
            BlendingMode: "destination-out",
            ParentGroup: {},
            TextureMask: {},
            PoseMapping: {
                Kneel: "Hide",
                KneelingSpread: "Hide",
                LegsClosed: "LegsClosed",
                Spread: "Spread",
                Hogtied: "Hogtied",
                AllFours: "Hide",
            },
        },
    ],
};

/** @type {[CustomAssetDefinition, Parameters<typeof AssetManager["addAssetWithConfig"]>[2]]} */
const upper = [
    assetUpper,
    {
        translation: {
            CN: "乳胶衣(上)",
            EN: "Latex Top",
            RU: "Латексный верх",
        },
        layerNames: {
            CN: {
                Base: "底色",
                Shadow: "阴影",
                Highlight: "高光",

                手套底色: "手套",
                手套阴影: "手套",
                手套高光: "手套",
                上底色: "上衣",
                上阴影: "上衣",
                上高光: "上衣",
            },
            EN: {
                Base: "Base",
                Shadow: "Shadow",
                Highlight: "Highlight",

                手套底色: "Glove",
                手套阴影: "Glove",
                手套高光: "Glove",
                上底色: "Top",
                上阴影: "Top",
                上高光: "Top",
            },
        },
        extended: {
            Archetype: ExtendedArchetype.TYPED,
            DrawImages: false,
            Options: [{ Name: "无" }, { Name: "有" }],
        },
        assetDialogs: {
            CN: { Select: "选择是否有手套", 无: "无", 有: "有" },
            EN: { Select: "Select whether to have gloves", 无: "No", 有: "Yes" },
        },
    },
];

/** @type {[CustomAssetDefinition, Parameters<typeof AssetManager["addAssetWithConfig"]>[2]]} */
const lower = [
    assetLower,
    {
        translation: {
            CN: "乳胶衣(下)",
            EN: "Latex Bottom",
            RU: "Латексный низ",
        },
        layerNames: {
            EN: {
                下底色: "Bottom Base",
                下阴影: "Bottom Shadow",
                下高光: "Bottom Highlight",
            },
        },
        extended: {
            Archetype: ExtendedArchetype.TYPED,
            DrawImages: false,
            Options: [{ Name: "无" }, { Name: "有" }],
        },
        assetDialogs: {
            CN: { Select: "选择是否有袜子", 无: "无", 有: "有" },
            EN: { Select: "Select whether to have socks", 无: "No", 有: "Yes" },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig("Suit", ...upper);
    AssetManager.addAssetWithConfig("SuitLower", ...lower);
}
