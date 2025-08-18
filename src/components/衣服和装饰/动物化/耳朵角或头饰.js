import { AssetManager } from "../../assetForward";

/** @type { CustomAssetDefinitionAppearance[] } */
const accessories = [
    {
        Name: "耳朵1_Luzi",
        Random: false,
        DynamicGroupName: "HairAccessory1",
        Top: -40,
        Left: 90,
        Priority: 20,
        DefaultColor: ["#7A4646", "#888888", "#0F0F0F"],
        Layer: [{ Name: "内圈" }, { Name: "绒毛" }, { Name: "外圈" }],
    },
    {
        Name: "耳朵2_Luzi",
        Random: false,
        DynamicGroupName: "HairAccessory1",
        Top: 0,
        Left: 90,
        Priority: 20,
        DefaultColor: ["#916A6A", "#888888", "#917451"],
        Layer: [{ Name: "内圈" }, { Name: "绒毛" }, { Name: "外圈" }],
    },
    {
        Name: "角7_Luzi",
        Random: false,
        DynamicGroupName: "HairAccessory1",
        Top: 0,
        Left: 0,
        Priority: 52,
    },
    {
        Name: "精灵耳2_Luzi",
        Random: false,
        DynamicGroupName: "HairAccessory1",
        Top: 0,
        Left: 90,
        Priority: 51,
        InheritColor: "BodyUpper",
        ColorSuffix: { HEX_COLOR: "White" },
    },
    {
        Name: "小马耳2_Luzi",
        Random: false,
        DynamicGroupName: "HairAccessory1",
        Top: 0,
        Left: 90,
    },
    {
        Name: "鱼鳍耳朵_Luzi",
        Random: false,
        DynamicGroupName: "HairAccessory1",
        Left: 160,
        Top: 150,
        Priority: 51,
        DefaultColor: ["#FFFFFF", "#888888", "#000000"],
        Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "A3" }],
    },
    {
        Name: "耷拉下来的耳朵_Luzi",
        Random: false,
        DynamicGroupName: "HairAccessory1",
        Left: 140,
        Top: 70,
        Priority: 51,
    },
];

/** @type { Translation.Dialog } */
const translationsBase = {
    CN: {
        耳朵1_Luzi: "耳朵 1",
        耳朵2_Luzi: "耳朵 2",
        角7_Luzi: "角 7",
        精灵耳2_Luzi: "精灵耳 2",
        小马耳2_Luzi: "小马耳 2",
        鱼鳍耳朵_Luzi: "鱼鳍耳朵",
        耷拉下来的耳朵_Luzi: "耷拉兔耳",
    },
    EN: {
        耳朵1_Luzi: "Ears 1",
        耳朵2_Luzi: "Ears 2",
        角7_Luzi: "Horn 7",
        精灵耳2_Luzi: "Elf Ears 2",
        小马耳2_Luzi: "Pony Ears 2",
        鱼鳍耳朵_Luzi: "Fish Fin Ears",
        耷拉下来的耳朵_Luzi: "Droopy Bunny Ears",
    },
    RU: {
        耳朵1_Luzi: "Уши 1",
        耳朵2_Luzi: "Уши 2",
        角7_Luzi: "Рог 7",
    },
};

const layerNamesBase = {
    EN: {
        耳朵1_Luzi: {
            内圈: "Inner",
            绒毛: "Fur",
            外圈: "Outer",
        },
        耳朵2_Luzi: {
            内圈: "Inner",
            绒毛: "Fur",
            外圈: "Outer",
        },
        鱼鳍耳朵_Luzi: {
            A1: "Base",
            A2: "Darkening",
            A3: "Fin Bones",
        },
    },
};

/** @type { CustomGroupedAssetDefinitions }} */
const assets = {
    HairAccessory1: accessories,
    HairAccessory2: accessories,
};

/** @type { Translation.GroupedEntries } */
const descriptions = ["HairAccessory1", "HairAccessory2"].reduce((acc, group) => {
    for (const [lang, entry] of Object.entries(translationsBase)) {
        acc[lang] = acc[lang] || {};
        acc[lang][group] = acc[lang][group] || {};

        for (const [key, value] of Object.entries(entry)) {
            if (!acc[lang][group][key]) acc[lang][group][key] = value;
        }
    }
    return acc;
}, /** @type { Translation.GroupedEntries } */ ({}));

const layerNames = ["HairAccessory1", "HairAccessory2"].reduce((acc, group) => {
    for (const [lang, entries] of Object.entries(layerNamesBase)) {
        acc[lang] = acc[lang] || {};
        acc[lang][group] = acc[lang][group] || {};

        for (const [key, entry] of Object.entries(entries)) {
            acc[lang][group][key] = entry;
        }
    }
    return acc;
}, /** @type { Translation.CustomRecord<CustomGroupName, Record<string,Record<string,string>>> } */ ({}));

export default function () {
    AssetManager.addGroupedAssetsWithConfig(assets, descriptions, layerNames);
}
