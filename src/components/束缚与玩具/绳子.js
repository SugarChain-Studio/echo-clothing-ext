import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";
import { TypedOptionCombiner } from "../../lib";

const modeText = {
    CN: (idx) => `模式${idx}`,
    EN: (idx) => `Pattern ${idx}`,
};

/** @type {AssetLayerDefinition} */
const upperLC = {
    ParentGroup: "BodyUpper",
};

/** @type {AssetLayerDefinition} */
const lowerFC = {
    ParentGroup: "BodyLower",
    PoseMapping: {},
};

/** @type {AssetLayerDefinition} */
const lowerLC = {
    ParentGroup: "BodyLower",
    PoseMapping: {
        LegsClosed: "LegsClosed",
        Kneel: "LegsClosed",
        Spread: "Spread",
    },
};

/** @type {AssetLayerDefinition[]} */
const Layers = [
    { Name: "AAA_1_后", ParentGroup: "BodyLower", CopyLayerColor: "A_2", Priority: 4 },

    { Name: "A_1", ...upperLC },
    { Name: "AA_1", ...lowerFC, CopyLayerColor: "A_1" },
    { Name: "AAA_1", ...lowerFC, CopyLayerColor: "A_1" },
    { Name: "AB_1_上", ...upperLC, CopyLayerColor: "A_1" },
    { Name: "AB_1_下", ...lowerLC, CopyLayerColor: "A_1" },
    { Name: "AC_1_上", ...upperLC, CopyLayerColor: "A_1" },
    { Name: "AC_1_下", ...lowerLC, CopyLayerColor: "A_1" },
    { Name: "B_1_上", ...upperLC, CopyLayerColor: "A_1" },
    { Name: "B_1_下", ...lowerLC, CopyLayerColor: "A_1" },

    { Name: "A_2", ...upperLC },
    { Name: "AA_2", ...lowerFC, CopyLayerColor: "A_2" },
    { Name: "AAA_2", ...lowerFC, CopyLayerColor: "A_2" },
    { Name: "AB_2_上", ...upperLC, CopyLayerColor: "A_2" },
    { Name: "AB_2_下", ...lowerLC, CopyLayerColor: "A_2" },
    { Name: "AC_2_上", ...upperLC, CopyLayerColor: "A_2" },
    { Name: "AC_2_下", ...lowerLC, CopyLayerColor: "A_2" },
    { Name: "B_2_上", ...upperLC, CopyLayerColor: "A_2" },
    { Name: "B_2_下", ...lowerLC, CopyLayerColor: "A_2" },
];

// 模式1: A_1 A_2
// 模式2: 模式1 + 模式6
// 模式3: 模式1 + 模式6 + 模式X1
// 模式4: 模式1 + 模式7
// 模式5: 模式1 + 模式8
// 模式6: AA_1 AA_2
// 模式7: AB_1_上 AB_1_下 AB_2_上 AB_2_下
// 模式8: AC_1_上 AC_1_下 AC_2_上 AC_2_下
// 模式9: B_1_上 B_1_下 B_2_上 B_2_下
// 模式10: AA_1 AA_2 + 模式X1

// 模式X1: AAA_1 AAA_2 AAA_1_后

// ItemTorso: 所有模式
// ItemLegs/ItemPelvis: 不含模式1和模式6的所有模式

const modeDisplay = {
    mode1: ["A_1", "A_2"],
    mode2: ["$mode1", "$mode6"],
    mode3: ["$mode1", "$mode6", "$_modex1"],
    mode4: ["$mode1", "$mode7"],
    mode5: ["$mode1", "$mode8"],
    mode6: ["AA_1", "AA_2"],
    mode7: ["AB_1_上", "AB_1_下", "AB_2_上", "AB_2_下"],
    mode8: ["AC_1_上", "AC_1_下", "AC_2_上", "AC_2_下"],
    mode9: ["B_1_上", "B_1_下", "B_2_上", "B_2_下"],

    mode10: ["AA_1", "AA_2", "$_modex1"],

    _modex1: ["AAA_1", "AAA_2", "AAA_1_后"],
};

const modeDisplayFlatten = Object.fromEntries(
    Object.entries(modeDisplay).map(([key, value]) => [
        key,
        value.map((item) => (item.startsWith("$") ? modeDisplay[item.slice(1)] : item)).flat(),
    ])
);

const options = new TypedOptionCombiner(Object.keys(modeDisplay));
options.combine(["mode1", "mode2", "mode6", "mode7", "mode8", "mode9"], { BondageLevel: 4 });
options.combine(["mode1", "mode2", "mode6", "mode7", "mode8", "mode9"], { BondageLevel: 4 });
options.combine(["mode4", "mode5"], { BondageLevel: 5 });
options.combine(["mode2", "mode4", "mode5", "mode6", "mode7", "mode8", "mode9"], {
    Property: { AllowActivePose: ["BaseLower", "LegsClosed", "Kneel"] },
});
options.combine(["mode3", "mode10"], {
    Prerequisite: ["CanLegsClosed"],
    BondageLevel: 6,
    Property: {
        Difficulty: 2,
        Effect: [E.Freeze],
        AllowActivePose: ["LegsClosed"],
        SetPose: ["LegsClosed"],
    },
});

const modeExtra = options.Options;

const groupModes = {
    ItemTorso: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `mode${i}`),
    ItemLegs: [6, 7, 8, 10].map((i) => `mode${i}`),
    ItemPelvis: [6, 7, 8, 10].map((i) => `mode${i}`),
};

const translation = {
    CN: "复杂麻绳",
    EN: "Sophisticated Hemp Rope",
};

const layerNames = {
    CN: {
        A_1: "皮肤层",
        A_2: "绳子层",
    },
    EN: {
        A_1: "Skin Layer",
        A_2: "Rope Layer",
    },
};

/** @type {CustomAssetDefinition} */
const assetBase = {
    Name: "绳子",
    Random: false,
    Left: 150,
    Top: 210,
    Time: 15,
    Difficulty: 4,
    CraftGroup: "绳子",
    DynamicGroupName: "ItemTorso",
    Layer: [],
};

/** @type {TypedItemConfig} */
const extendedBase = {
    Archetype: ExtendedArchetype.TYPED,
    ChatTags: Tools.CommonChatTags(),
    Options: [],
};

/**
 * @param {string[]} modes
 * @returns {AssetLayerDefinition[]}
 */
function modes2LayerConfig(modes) {
    return Layers.map((layer) => {
        const layerModes = modes
            .map((m, i) => (modeDisplayFlatten[m].includes(layer.Name) ? i : undefined))
            .filter((v) => v !== undefined);
        return { ...layer, AllowTypes: { typed: layerModes } };
    });
}

/**
 * @param {string[]} modes
 * @returns {TypedItemOptionConfig[]}
 */
function modes2TypedOption(modes) {
    return modes.map((m) => ({ Name: m, ...modeExtra[m] }));
}

const assetStrings = {
    CN: {
        Select: "选择复杂麻绳样式",
        ...Object.fromEntries(Object.entries(modeDisplay).map(([key], i) => [key, modeText.CN(i + 1)])),
        ...Object.fromEntries(
            Object.entries(modeDisplay).map(([key], i) => [
                `Set${key}`,
                `SourceCharacter将DestinationCharacterAssetName设置为${modeText.CN(i + 1)}.`,
            ])
        ),
    },
    EN: {
        Select: "Select Complex Hemp Rope Style",
        ...Object.fromEntries(Object.entries(modeDisplay).map(([key], i) => [key, modeText.EN(i + 1)])),
        ...Object.fromEntries(
            Object.entries(modeDisplay).map(([key], i) => [
                `Set${key}`,
                `SourceCharacter set DestinationCharacter AssetName to ${modeText.EN(i + 1)}.`,
            ])
        ),
    },
};

export default function () {
    AssetManager.addImageMapping({
        "Assets/Female3DCG/ItemTorso/Preview/绳子.png": "Screens/Inventory/ItemTorso/绳子/mode2.png",
    });

    for (const groupName of /** @type {(keyof typeof groupModes)[]}*/ (Object.keys(groupModes))) {
        const modes = groupModes[groupName];
        const asset = { ...assetBase, Layer: modes2LayerConfig(modes) };
        const extended = { ...extendedBase, Options: modes2TypedOption(modes) };
        AssetManager.addAssetWithConfig(groupName, asset, { translation, layerNames, extended, assetStrings });
    }
}
