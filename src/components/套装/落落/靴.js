import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "拉链皮靴",
    Random: false,
    Left: 110,
    Top: 740,
    PoseMapping: {
        Kneel: PoseType.HIDE,
        KneelingSpread: PoseType.HIDE,
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Priority: 23,
    Layer: [
        {
            Name: "基础_右",
            ColorGroup: "Right",
            AllowTypes: { r: 0 },
        },
        {
            Name: "基础_左",
            ColorGroup: "Left",
            AllowTypes: { l: 0 },
        },
        {
            Name: "翻开_右",
            ColorGroup: "Right",
            AllowTypes: { r: 1 },
        },
        {
            Name: "翻开_左",
            ColorGroup: "Left",
            AllowTypes: { l: 1 },
        },
    ],
};

const layerNames = {
    CN: {
        Left: "左",
        Right: "右",
        基础_右: "基础（右）",
        基础_左: "基础（左）",
        翻开_右: "翻开（右）",
        翻开_左: "翻开（左）",
    },
    EN: {
        Left: "Left",
        Right: "Right",
        基础_右: "Base (Right)",
        基础_左: "Base (Left)",
        翻开_右: "Open (Right)",
        翻开_左: "Open (Left)",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "拉链皮靴",
    EN: "Zipper Leather Boots",
};

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    Modules: [
        {
            Name: "左侧",
            Key: "l",
            DrawImages: false,
            Options: [{}, {}],
        },
        {
            Name: "右侧",
            Key: "r",
            DrawImages: false,
            Options: [{}, {}],
        },
    ],
};

const assetStrings = {
    CN: {
        SelectBase: "选择外观",
        Module左侧: "左侧",
        Module右侧: "右侧",

        Select左侧: "选择左侧外观",
        Optionl0: "基础",
        Optionl1: "翻开",

        Select右侧: "选择右侧外观",
        Optionr0: "基础",
        Optionr1: "翻开",
    },
    EN: {
        SelectBase: "Choose Appearance",
        Module左侧: "Left Side",
        Module右侧: "Right Side",

        Select左侧: "Choose Left Appearance",
        Optionl0: "Base",
        Optionl1: "Open",

        Select右侧: "Choose Right Appearance",
        Optionr0: "Base",
        Optionr1: "Open",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("Shoes", asset, {
        translation,
        layerNames,
        extended,
        assetStrings,
    });
}
