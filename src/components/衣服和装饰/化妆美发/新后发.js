import { AssetManager } from "../../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "左侧" }, { Name: "右侧" }, { Name: "都有" }],
};

const assetStrings = {
    CN: {
        Select: "选择外观",
        左侧: "左侧",
        右侧: "右侧",
        都有: "都有",
    },
    EN: {
        Select: "Choose look",
        左侧: "Left",
        右侧: "Right",
        都有: "Both",
    },
};

/** @type {AddAssetWithConfigParamsNoGroup[]}} */
const assetsN = [
    [
        {
            Name: "侧马尾1",
            Random: false,
            Left: 50,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 32,
            Layer: [
                { Name: "左侧", AllowTypes: { typed: [0, 2] } },
                { Name: "右侧", AllowTypes: { typed: [1, 2] } },
            ],
        },
        {
            translation: { CN: "侧马尾1", EN: "Side Ponytail 1" },
            layerNames: { CN: { 左侧: "左侧", 右侧: "右侧" }, EN: { 左侧: "Left", 右侧: "Right" } },
            extended,
            assetStrings,
        },
    ],
    [
        {
            Name: "侧马尾2",
            Random: false,
            Left: 50,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 32,
            Layer: [
                { Name: "左侧", AllowTypes: { typed: [0, 2] } },
                { Name: "右侧", Priority: 32, AllowTypes: { typed: [1, 2] } },
            ],
        },
        {
            translation: { CN: "侧马尾2", EN: "Side Ponytail 2" },
            layerNames: { CN: { 左侧: "左侧", 右侧: "右侧" }, EN: { 左侧: "Left", 右侧: "Right" } },
            extended,
            assetStrings,
        },
    ],
    [
        {
            Name: "侧马尾3",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 32,
            Layer: [
                { Name: "左侧", AllowTypes: { typed: [0, 2] } },
                { Name: "右侧", AllowTypes: { typed: [1, 2] } },
            ],
        },
        {
            translation: { CN: "侧马尾3", EN: "Side Ponytail 3" },
            layerNames: { CN: { 左侧: "左侧", 右侧: "右侧" }, EN: { 左侧: "Left", 右侧: "Right" } },
            extended,
            assetStrings,
        },
    ],
    [
        {
            Name: "侧马尾4",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 32,
            Layer: [
                { Name: "左侧", AllowTypes: { typed: [0, 2] } },
                { Name: "右侧", AllowTypes: { typed: [1, 2] } },
            ],
        },
        {
            translation: { CN: "侧马尾4", EN: "Side Ponytail 4" },
            layerNames: { CN: { 左侧: "左侧", 右侧: "右侧" }, EN: { 左侧: "Left", 右侧: "Right" } },
            extended,
            assetStrings,
        },
    ],
    [
        {
            Name: "低双马尾1",
            Random: false,
            Left: 50,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 32,
        },
        { translation: { CN: "低双马尾1", EN: "Low Double Ponytail 1" }, layerNames: {} },
    ],
    [
        {
            Name: "低双马尾2",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 32,
        },
        { translation: { CN: "低双马尾2", EN: "Low Double Ponytail 2" }, layerNames: {} },
    ],
    [
        {
            Name: "低双马尾3",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "低双马尾3", EN: "Low Double Ponytail 3" }, layerNames: {} },
    ],
    [
        {
            Name: "低双马尾4",
            Random: false,
            Left: 50,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "低双马尾4", EN: "Low Double Ponytail 4" }, layerNames: {} },
    ],
    [
        {
            Name: "低双马尾5",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "低双马尾5", EN: "Low Double Ponytail 5" }, layerNames: {} },
    ],
    [
        {
            Name: "低双马尾6",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "低双马尾6", EN: "Low Double Ponytail 6" }, layerNames: {} },
    ],
    [
        {
            Name: "双马尾1",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "双马尾1", EN: "Double Ponytail 1" }, layerNames: {} },
    ],
    [
        {
            Name: "双马尾2",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "双马尾2", EN: "Double Ponytail 2" }, layerNames: {} },
    ],
    [
        {
            Name: "双马尾3",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "双马尾3", EN: "Double Ponytail 3" }, layerNames: {} },
    ],
    [
        {
            Name: "双马尾4",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "双马尾4", EN: "Double Ponytail 4" }, layerNames: {} },
    ],
    [
        {
            Name: "双马尾5",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "双马尾5", EN: "Double Ponytail 5" }, layerNames: {} },
    ],
    [
        {
            Name: "双马尾6",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "双马尾6", EN: "Double Ponytail 6" }, layerNames: {} },
    ],
    [
        {
            Name: "卷发后1",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 32,
        },
        { translation: { CN: "卷发后1", EN: "Curly Hair Back 1" }, layerNames: {} },
    ],
    [
        {
            Name: "卷发后2",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "卷发后2", EN: "Curly Hair Back 2" }, layerNames: {} },
    ],
    [
        {
            Name: "卷发后3",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "卷发后3", EN: "Curly Hair Back 3" }, layerNames: {} },
    ],
    [
        {
            Name: "卷发后3b",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "卷发后3b", EN: "Curly Hair Back 3b" }, layerNames: {} },
    ],
    [
        {
            Name: "卷发后4",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "卷发后4", EN: "Curly Hair Back 4" }, layerNames: {} },
    ],
    [
        {
            Name: "单马尾1",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Layer: [
                { Name: "左侧", AllowTypes: { typed: [0, 2] } },
                { Name: "右侧", AllowTypes: { typed: [1, 2] } },
            ],
        },
        {
            translation: { CN: "单马尾1", EN: "Single Ponytail 1" },
            layerNames: { CN: { 左侧: "左侧", 右侧: "右侧" }, EN: { 左侧: "Left", 右侧: "Right" } },
            extended,
            assetStrings,
        },
    ],
    [
        {
            Name: "单马尾1b",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Layer: [
                { Name: "左侧", AllowTypes: { typed: [0, 2] } },
                { Name: "右侧", AllowTypes: { typed: [1, 2] } },
            ],
        },
        {
            translation: { CN: "单马尾1b", EN: "Single Ponytail 1b" },
            layerNames: { CN: { 左侧: "左侧", 右侧: "右侧" }, EN: { 左侧: "Left", 右侧: "Right" } },
            extended,
            assetStrings,
        },
    ],
    [
        {
            Name: "单马尾2",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Layer: [
                { Name: "左侧", AllowTypes: { typed: [0, 2] } },
                { Name: "右侧", AllowTypes: { typed: [1, 2] } },
            ],
        },
        {
            translation: { CN: "单马尾2", EN: "Single Ponytail 2" },
            layerNames: { CN: { 左侧: "左侧", 右侧: "右侧" }, EN: { 左侧: "Left", 右侧: "Right" } },
            extended,
            assetStrings,
        },
    ],
    [
        {
            Name: "后发髻1",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "后发髻1", EN: "Back Bun 1" }, layerNames: {} },
    ],
    [
        {
            Name: "后发髻2",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            InheritColor: "HairFront",
            Priority: 5,
        },
        { translation: { CN: "后发髻2", EN: "Back Bun 2" }, layerNames: {} },
    ],
    [
        {
            Name: "双马尾7",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            DefaultColor: ["Default", "Default", "#AE7384", "#AE7384", "#B3B3B3", "#B3B3B3", "#D7D7D7", "#D7D7D7"],
            Layer: [
                { Name: "A1", ColorGroup: "Base", InheritColor: "HairFront" },
                { Name: "B1", ColorGroup: "Base", InheritColor: "HairFront" },
                { Name: "A2", ColorGroup: "Stripe" },
                { Name: "B2", ColorGroup: "Stripe" },
                { Name: "A3", ColorGroup: "Ties" },
                { Name: "B3", ColorGroup: "Ties" },
                { Name: "A4", ColorGroup: "Ring" },
                { Name: "B4", ColorGroup: "Ring" },
            ],
        },
        {
            translation: { CN: "双马尾7", EN: "Double Ponytail 7" },
            layerNames: {
                CN: {
                    A1: "左",
                    B1: "右",
                    A2: "左",
                    B2: "右",
                    A3: "左",
                    B3: "右",
                    A4: "左",
                    B4: "右",
                    Base: "底色",
                    Stripe: "条纹",
                    Ties: "发绳",
                    Ring: "发圈",
                },
                EN: {
                    A1: "Left",
                    B1: "Right",
                    A2: "Left",
                    B2: "Right",
                    A3: "Left",
                    B3: "Right",
                    A4: "Left",
                    B4: "Right",
                    Base: "Base",
                    Stripe: "Stripe",
                    Ties: "Ties",
                    Ring: "Ring",
                },
            },
        },
    ],
];

export default function () {
    for (const [asset, option] of assetsN) {
        AssetManager.addAssetWithConfig("新后发_Luzi", asset, option);
    }
}
