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
        Top: 120,
        Left: 180,
        // DefaultColor: ["Default", "Default", "#404040", "#2F0707", "#000000", "#000000", "#000000", "#000000"],
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
        CN: "天狐",
        EN: "Celestial Vixen",
    },
};

/** @type { Translation.CustomRecord<string,string> } */
const layerNames = {
    CN: {
        1: "下眼睑",
        2: "上眼睑",
        3: "眼球",
        4: "虹膜",
        5: "虹膜边缘",
        6: "瞳孔",
        7: "下睫毛",
        8: "上睫毛",
    },
    EN: {
        1: "Lower Eyelid",
        2: "Upper Eyelid",
        3: "Eyeball",
        4: "Iris",
        5: "Iris Edge",
        6: "Pupil",
        7: "Lower Lash",
        8: "Upper Lash",
    },
};

/** @type { CustomGroupedAssetDefinitions }} */
const mirroredAssets = {
    左眼_Luzi: assets,
    右眼_Luzi: assets,
};

const groupedLayerNames = {
    CN: { 左眼_Luzi: { 眼睛2: layerNames.CN }, 右眼_Luzi: { 眼睛2: layerNames.CN } },
    EN: { 左眼_Luzi: { 眼睛2: layerNames.EN }, 右眼_Luzi: { 眼睛2: layerNames.EN } },
};

/** @type {CustomGroupName[]} */
const eyeGroups = ["左眼_Luzi", "右眼_Luzi"];

/** @type { Translation.GroupedEntries } */
const mirroredTranslations = Object.entries(translations).reduce((acc, [name, value]) => {
    for (const [lang, text] of Object.entries(value)) {
        acc[lang] ??= {};
        for (const group of eyeGroups) {
            acc[lang][group] ??= {};
            acc[lang][group][name] = text;
        }
    }
    return acc;
}, /** @type { Translation.GroupedEntries } */ ({}));

export default function () {
    AssetManager.addGroupedAssetsWithConfig(mirroredAssets, mirroredTranslations, groupedLayerNames);
}
