import { AssetManager } from "../../../assetForward";
import { DialogTools } from "@mod-utils/Tools";
import { VersionSupport } from "@mod-utils/VersionSupport";

/** @type {Array<CustomAssetDefinition>}} */
const assets = [
    {
        Name: "发卡1",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: VersionSupport.NoParentGroup,
        Extended: true,
        Layer: [
            {
                Name: "左侧",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
            {
                Name: "右侧",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
        ],
    },
    {
        Name: "发卡2",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: VersionSupport.NoParentGroup,
        Extended: true,
        Layer: [
            {
                Name: "左侧",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
            {
                Name: "右侧",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
        ],
    },
    {
        Name: "X发卡",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: VersionSupport.NoParentGroup,
        Extended: true,
        Layer: [
            {
                Name: "左侧",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
            {
                Name: "右侧",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
        ],
    },
    {
        Name: "心型发卡",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: VersionSupport.NoParentGroup,
        Extended: true,
        DefaultColor: ["#9B3C5C", "#9B3C5C", "#9B3C5C", "#9B3C5C"],
        Layer: [
            {
                Name: "左侧夹子",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
            {
                Name: "左侧心",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
            {
                Name: "右侧夹子",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
            {
                Name: "右侧心",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
        ],
    },
    {
        Name: "星星发卡",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: VersionSupport.NoParentGroup,
        DefaultColor: ["#D0CF58", "#D0CF58"],
        Extended: true,
        Layer: [
            {
                Name: "左侧",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
            {
                Name: "右侧",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
            },
        ],
    },
    {
        Name: "星星发卡2",
        Random: false,
        Left: 100,
        Top: 0,
        ParentGroup: VersionSupport.NoParentGroup,
        DefaultColor: ["#D0CF58", "#D0CF58"],
        Extended: true,
        Layer: [
            {
                Name: "左侧",
                Priority: 54,
                AllowTypes: { typed: [0, 2] },
            },
            {
                Name: "右侧",
                Priority: 54,
                AllowTypes: { typed: [1, 2] },
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
    Options: [{ Name: "左侧" }, { Name: "右侧" }, { Name: "都有" }],
};

const dialogGen = (name) =>
    DialogTools.replicateGroupedItemDialog(["HairAccessory1", "HairAccessory3"], [name], {
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
