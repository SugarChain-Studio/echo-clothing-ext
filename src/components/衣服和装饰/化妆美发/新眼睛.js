import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinitionAppearance[]} */
const assets = [
    {
        Name: "眼睛1",
        Top: 120,
        Left: 180,
        FullAlpha: false,
    },
    {
        Name: "眼睛2",
        Top: 0,
        Left: 0,
        DefaultColor: ["Default", "Default", "#404040", "#2F0707", "#000000", "#000000", "#000000", "#000000"],
        Layer: [
            { Name: "1", AllowColorize: true },
            { Name: "2", AllowColorize: true },
            { Name: "3", AllowColorize: true },
            { Name: "4", AllowColorize: true },
            { Name: "5", AllowColorize: true },
            { Name: "6", AllowColorize: true },
            { Name: "7", AllowColorize: true },
            { Name: "8", AllowColorize: true },
        ],
    },
];

/** @type { Record<string,Translation.Entry> } */
const translations = {
    眼睛1: {
        CN: "红宝石",
        EN: "Ruby",
    },
    眼睛2: {
        CN: "眼睛 2",
        EN: "Eye 2",
    },
};

/** @type { CustomGroupedAssetDefinitions }} */
const mirroredAssets = {
    左眼_Luzi: assets,
    右眼_Luzi: assets,
};

/** @type { Translation.GroupedEntries } */
const mirroredTranslations = Object.entries(translations).reduce((acc, [name, value]) => {
    for (const [lang, text] of Object.entries(value)) {
        acc[lang] ??= {};
        for (const group of ["左眼_Luzi", "右眼_Luzi"]) {
            acc[lang][group] ??= {};
            acc[lang][group][name] = text;
        }
    }
    return acc;
}, /** @type { Translation.GroupedEntries } */ ({}));

export default function () {
    AssetManager.addGroupedAssets(mirroredAssets, mirroredTranslations);
}
