import { AssetManager } from "../../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type {Array<CustomAssetDefinition>}} */
const assets = [
    {
        Name: "发卡1",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: {},
        Extended: true,
        Layer: [
            {
                Name: "右",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
            {
                Name: "左",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
        ],
    },
    {
        Name: "发卡2",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: {},
        Extended: true,
        Layer: [
            {
                Name: "右",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
            {
                Name: "左",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
        ],
    },
    {
        Name: "X发卡",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: {},
        Extended: true,
        Layer: [
            {
                Name: "右",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
            {
                Name: "左",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
        ],
    },
    {
        Name: "心型发卡",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: {},
        Extended: true,
        DefaultColor: ["#9B3C5C", "#9B3C5C", "#9B3C5C", "#9B3C5C"],
        Layer: [
            {
                Name: "右夹子",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
            {
                Name: "右心",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
            {
                Name: "左夹子",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
            {
                Name: "左心",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
        ],
    },
    {
        Name: "星星发卡",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: {},
        DefaultColor: ["#D0CF58", "#D0CF58"],
        Extended: true,
        Layer: [
            {
                Name: "右",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
            {
                Name: "左",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
        ],
    },
    {
        Name: "星星发卡2",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: {},
        DefaultColor: ["#D0CF58", "#D0CF58"],
        Extended: true,
        Layer: [
            {
                Name: "右",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
            {
                Name: "左",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
        ],
    },
    {
        Name: "月亮发饰",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: {},
        DefaultColor: ["#D0CF58", "#D0CF58"],
        Extended: true,
        Layer: [
            {
                Name: "右",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
            {
                Name: "左",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
        ],
    },
    {
        Name: "蝴蝶",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: {},
        DefaultColor: ["#8B87FF", "#8B87FF"],
        Extended: true,
        Layer: [
            {
                Name: "右",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
            {
                Name: "左",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
        ],
    },
    {
        Name: "蝴蝶2",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: {},
        DefaultColor: ["#6382FF", "#6382FF", "#6382FF", "#6382FF"],
        Extended: true,
        Layer: [
            {
                Name: "右后",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
            {
                Name: "右前",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
            {
                Name: "左后",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
            {
                Name: "左前",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
        ],
    },
    {
        Name: "蝙蝠翼发卡",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: {},
        DefaultColor: ["#232323", "#232323"],
        Extended: true,
        Layer: [
            {
                Name: "右",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
            {
                Name: "左",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
        ],
    },
];

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        HairAccessory1: {
            发卡1: "发卡 1",
            发卡2: "发卡 2",
            X发卡: "X发卡",
            心型发卡: "心型发卡",
            星星发卡: "星星发卡",
            星星发卡2: "星星发卡 2",
            月亮发饰: "月亮发饰",
            蝙蝠翼发卡: "蝙蝠翼发卡",
            蝴蝶: "蝴蝶",
            蝴蝶2: "蝴蝶 2",
        },
    },
    EN: {
        HairAccessory1: {
            发卡1: "Hair Clip 1",
            发卡2: "Hair Clip 2",
            X发卡: "X Hair Clip",
            心型发卡: "Heart Hair Clip",
            星星发卡: "Star Hair Clip",
            星星发卡2: "Star Hair Clip 2",
            月亮发饰: "Moon Hair Clip",
            蝙蝠翼发卡: "Bat Wing Hair Clip",
            蝴蝶: "Butterfly",
            蝴蝶2: "Butterfly 2",
        },
    },
};

// 为 HairAccessory3 复制相同的翻译
Object.keys(translations).forEach((lang) => {
    translations[lang].HairAccessory3 = { ...translations[lang].HairAccessory1 };
});
/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "左" }, { Name: "右" }, { Name: "两侧" }],
};

const dialogGen = (name) =>
    DialogTools.replicateGroupedItemDialog(["HairAccessory1", "HairAccessory3"], [name], {
        CN: {
            Select: "选择外观",
            左: "左",
            右: "右",
            两侧: "两侧",
        },
        EN: {
            Select: "Choose look",
            左: "Left",
            右: "Right",
            两侧: "Both",
        },
    });

export default function () {
    assets.forEach((asset) => {
        const names = DialogTools.pickDialog(translations, "HairAccessory1", asset.Name);
        AssetManager.addAsset("HairAccessory1", asset, extended, names);
        const names2 = DialogTools.pickDialog(translations, "HairAccessory3", asset.Name);
        AssetManager.addAsset("HairAccessory3", asset, extended, names2);
        AssetManager.addCustomDialog(dialogGen(asset.Name));
    });
}
