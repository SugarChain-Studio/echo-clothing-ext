import { AssetManager } from "../../../assetForward";
import { ExtendedTools } from "../../../lib";

const hairAccShared = {
    Random: false,
    Left: 100,
    Top: 0,
    Priority: 54,
    ParentGroup: {},
};

/** @type { Translation.String } */
const layerNames = {
    CN: {
        右: "右",
        左: "左",
        右夹子: "右夹子",
        右心: "右心",
        左夹子: "左夹子",
        左心: "左心",

        右后: "右后",
        右前: "右前",
        左后: "左后",
        左前: "左前",
    },
    EN: {
        右: "Right",
        左: "Left",
        右夹子: "Right Clip",
        右心: "Right Heart",
        左夹子: "Left Clip",
        左心: "Left Heart",

        右后: "Right Back",
        右前: "Right Front",
        左后: "Left Back",
        左前: "Left Front",
    },
};

/** @type {AddAssetWithConfigParamsNoGroup[]}} */
const assets = [
    ExtendedTools.createLRBConfig([
        {
            Name: "发卡1",
            ...hairAccShared,
            DefaultColor: ["#621616", "#621616"],
            Layer: [{ Name: "右" }, { Name: "左" }],
        },
        { translation: { CN: "发卡1", EN: "Basic Hair Clip 1" }, layerNames },
    ]),
    ExtendedTools.createLRBConfig([
        {
            Name: "发卡2",
            ...hairAccShared,
            DefaultColor: ["#621616", "#621616"],
            Layer: [{ Name: "右" }, { Name: "左" }],
        },
        { translation: { CN: "发卡2", EN: "Basic Hair Clip 2" }, layerNames },
    ]),
    ExtendedTools.createLRBConfig([
        {
            Name: "X发卡",
            ...hairAccShared,
            DefaultColor: ["#621616", "#621616"],
            Layer: [{ Name: "右" }, { Name: "左" }],
        },
        { translation: { CN: "X发卡", EN: "X Hair Clip" }, layerNames },
    ]),
    ExtendedTools.createLRBConfig([
        {
            Name: "心型发卡",
            ...hairAccShared,
            DefaultColor: ["#9B3C5C", "#9B3C5C", "#9B3C5C", "#9B3C5C"],
            Layer: [{ Name: "右夹子" }, { Name: "右心" }, { Name: "左夹子" }, { Name: "左心" }],
        },
        { translation: { CN: "心型发卡", EN: "Heart Hair Clip" }, layerNames },
    ]),
    ExtendedTools.createLRBConfig([
        {
            Name: "星星发卡",
            ...hairAccShared,
            DefaultColor: ["#D0CF58", "#D0CF58"],
            Layer: [{ Name: "右" }, { Name: "左" }],
        },
        { translation: { CN: "星星发卡", EN: "Star Hair Clip" }, layerNames },
    ]),
    ExtendedTools.createLRBConfig([
        {
            Name: "星星发卡2",
            ...hairAccShared,
            DefaultColor: ["#D0CF58", "#D0CF58"],
            Layer: [{ Name: "右" }, { Name: "左" }],
        },
        { translation: { CN: "星星发卡2", EN: "Star Hair Clip 2" }, layerNames },
    ]),
    ExtendedTools.createLRBConfig([
        {
            Name: "月亮发饰",
            ...hairAccShared,
            DefaultColor: ["#D0CF58", "#D0CF58"],
            Layer: [{ Name: "右" }, { Name: "左" }],
        },
        { translation: { CN: "月亮发饰", EN: "Moon Hair Clip" }, layerNames },
    ]),
    ExtendedTools.createLRBConfig([
        {
            Name: "蝴蝶",
            ...hairAccShared,
            DefaultColor: ["#8B87FF", "#8B87FF"],
            Layer: [{ Name: "右" }, { Name: "左" }],
        },
        { translation: { CN: "蝴蝶", EN: "Butterfly Hair Clip" }, layerNames },
    ]),
    ExtendedTools.createLRBConfig([
        {
            Name: "蝴蝶2",
            ...hairAccShared,
            DefaultColor: ["#6382FF", "#6382FF", "#6382FF", "#6382FF"],
            Layer: [{ Name: "右后" }, { Name: "右前" }, { Name: "左后" }, { Name: "左前" }],
        },
        { translation: { CN: "蝴蝶2", EN: "Butterfly Hair Clip 2" }, layerNames },
    ]),
    ExtendedTools.createLRBConfig([
        {
            Name: "蝙蝠翼发卡",
            ...hairAccShared,
            DefaultColor: ["#232323", "#232323"],
            Layer: [{ Name: "右" }, { Name: "左" }],
        },
        { translation: { CN: "蝙蝠翼发卡", EN: "Bat Wing Hair Clip" }, layerNames },
    ]),
    ExtendedTools.createLRBConfig([
        {
            Name: "N四叶草",
            ...hairAccShared,
            Layer: [{ Name: "右" }, { Name: "左" }],
        },
        { translation: { CN: "天然四叶草发卡", EN: "Natural Clover Hair Clip" }, layerNames },
    ]),
    ExtendedTools.createLRBConfig([
        {
            Name: "E四叶草",
            ...hairAccShared,
            Layer: [
                { Name: "右_金属框", ColorGroup: "金属框" },
                { Name: "右_宝石", ColorGroup: "宝石" },
                { Name: "右_钻石", ColorGroup: "钻石" },
                { Name: "左_金属框", ColorGroup: "金属框" },
                { Name: "左_宝石", ColorGroup: "宝石" },
                { Name: "左_钻石", ColorGroup: "钻石" },
            ],
        },
        {
            translation: { CN: "珠宝四叶草发卡", EN: "Jeweled Clover Hair Clip" },
            layerNames: {
                CN: {
                    右_金属框: "右",
                    右_宝石: "右",
                    右_钻石: "右",
                    左_金属框: "左",
                    左_宝石: "左",
                    左_钻石: "左",

                    金属框: "金属框",
                    宝石: "宝石",
                    钻石: "钻石",
                },
                EN: {
                    右_金属框: "Right",
                    右_宝石: "Right",
                    右_钻石: "Right",
                    左_金属框: "Left",
                    左_宝石: "Left",
                    左_钻石: "Left",

                    金属框: "Metal Frame",
                    宝石: "Gem",
                    钻石: "Diamond",
                },
            },
        },
    ]),
];

export default function () {
    AssetManager.addAssetWithConfig(["HairAccessory1", "HairAccessory3"], assets);
}
