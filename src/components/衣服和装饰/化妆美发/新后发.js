import { AssetManager } from "../../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type {Array<CustomAssetDefinition>}} */
const assets = [
    {
        Name: "侧马尾1",
        Random: false,
        Left: 50,
        Top: 0,
        ParentGroup: {},
        Extended: true,
        InheritColor: "HairFront",

        Layer: [
            {
                Name: "左侧",
                Priority: 32,
                AllowTypes: { typed: [0, 2] },
            },
            {
                Name: "右侧",
                Priority: 32,
                AllowTypes: { typed: [1, 2] },
            },
        ],
    },
    {
        Name: "侧马尾2",
        Random: false,
        Left: 50,
        Top: 0,
        ParentGroup: {},
        Extended: true,
        InheritColor: "HairFront",
        Layer: [
            {
                Name: "左侧",
                Priority: 32,
                AllowTypes: { typed: [0, 2] },
            },
            {
                Name: "右侧",
                Priority: 32,
                AllowTypes: { typed: [1, 2] },
            },
        ],
    },
    {
        Name: "侧马尾3",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: true,
        InheritColor: "HairFront",
        Layer: [
            {
                Name: "左侧",
                Priority: 32,
                AllowTypes: { typed: [0, 2] },
            },
            {
                Name: "右侧",
                Priority: 32,
                AllowTypes: { typed: [1, 2] },
            },
        ],
    },
    {
        Name: "低双马尾1",
        Random: false,
        Left: 50,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 32,
    },
    {
        Name: "低双马尾2",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 32,
    },
    {
        Name: "低双马尾3",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 5,
    },
    {
        Name: "低双马尾4",
        Random: false,
        Left: 50,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 5,
    },
    {
        Name: "低双马尾5",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 5,
    },
    {
        Name: "低双马尾6",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 5,
    },
    {
        Name: "双马尾1",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 5,
    },
    {
        Name: "双马尾2",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 5,
    },
    {
        Name: "双马尾3",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 5,
    },
    {
        Name: "双马尾4",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 5,
    },
    {
        Name: "双马尾5",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 5,
    },
    {
        Name: "双马尾6",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 5,
    },
    {
        Name: "卷发后1",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 32,
    },
    {
        Name: "卷发后2",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 5,
    },
    {
        Name: "卷发后3",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 5,
    },
    {
        Name: "后发髻1",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 5,
    },
    {
        Name: "后发髻2",
        Random: false,
        Left: 0,
        Top: 0,
        ParentGroup: {},
        Extended: false,
        InheritColor: "HairFront",
        Priority: 5,
    },
];

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        新后发_Luzi: {
            侧马尾1: "侧马尾 1",
            侧马尾2: "侧马尾 2",
            侧马尾3: "侧马尾 3",
            低双马尾1: "低双马尾 1",
            低双马尾2: "低双马尾 2",
            低双马尾3: "低双马尾 3",
            低双马尾4: "低双马尾 4",
            低双马尾5: "低双马尾 5",
            低双马尾6: "低双马尾 6",
            双马尾1: "双马尾 1",
            双马尾2: "双马尾 2",
            双马尾3: "双马尾 3",
            双马尾4: "双马尾 4",
            双马尾5: "双马尾 5",
            双马尾6: "双马尾 6",
            卷发后1: "卷发后1",
            卷发后2: "卷发后2",
            卷发后3: "卷发后3",
            后发髻1: "后发髻1",
            后发髻2: "后发髻2",
        },
    },
    EN: {
        新后发_Luzi: {
            侧马尾1: "Side Ponytail 1",
            侧马尾2: "Side Ponytail 2",
            侧马尾3: "Side Ponytail 3",
            低双马尾1: "Low Double Ponytail 1",
            低双马尾2: "Low Double Ponytail 2",
            低双马尾3: "Low Double Ponytail 3",
            低双马尾4: "Low Double Ponytail 4",
            低双马尾5: "Low Double Ponytail 5",
            低双马尾6: "Low Double Ponytail 6",
            双马尾1: "Double Ponytail 1",
            双马尾2: "Double Ponytail 2",
            双马尾3: "Double Ponytail 3",
            双马尾4: "Double Ponytail 4",
            双马尾5: "Double Ponytail 5",
            双马尾6: "Double Ponytail 6",
            卷发后1: "Curly Hair Back 1",
            卷发后2: "Curly Hair Back 2",
            卷发后3: "Curly Hair Back 3",
            后发髻1: "Back Bun 1",
            后发髻2: "Back Bun 2",
        },
    },
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "左侧" }, { Name: "右侧" }, { Name: "都有" }],
};

const dialogGen = (name) =>
    DialogTools.replicateGroupedItemDialog(["新后发_Luzi"], [name], {
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
        const names = DialogTools.pickDialog(translations, "新后发_Luzi", asset.Name);
        if (asset.Extended === true) {
            AssetManager.addAsset("新后发_Luzi", asset, extended, names);
            AssetManager.addCustomDialog(dialogGen(asset.Name));
        } else {
            AssetManager.addAsset("新后发_Luzi", asset, null, names);
        }
    });
}
