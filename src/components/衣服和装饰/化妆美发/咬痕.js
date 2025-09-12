import { PoseMapTools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { createItemDialogModular } from "../../../lib";

/** @typedef {AssetLayerDefinition& { Text: Translation.Entry }} AssetLayerDefWithText */

/** @type {(def:AssetLayerDefWithText)=>AssetLayerDefWithText} */
const chestLayer = (def) => ({
    ...def,
    Left: 200,
    Top: 210,
    PoseMapping: {},
});

/** @type {(def:AssetLayerDefWithText)=>AssetLayerDefWithText} */
const breastLayer = (def) => ({
    ...def,
    Priority: 12,
    Left: 170,
    Top: 300,
    PoseMapping: { AllFours: "AllFours" },
    ParentGroup: "BodyUpper",
});

/** @type {(def:AssetLayerDefWithText)=>AssetLayerDefWithText} */
const breastLoLayer = (def) => ({
    ...def,
    Priority: 12,
    Left: 170,
    Top: 300,
    PoseMapping: { AllFours: "Hide" },
    ParentGroup: "BodyUpper",
});

/** @type {(def:AssetLayerDefWithText)=>AssetLayerDefWithText} */
const tummyLayer = (def) => ({
    ...def,
    Left: 180,
    Top: 370,
    PoseMapping: PoseMapTools.HideFullBody(),
    Priority: 10,
});

/** @type {AssetLayerDefWithText[]} */
const layers = [
    chestLayer({ Name: "FB", Text: { CN: "胸口", EN: "Chest" } }),
    chestLayer({ Name: "Sa", Text: { CN: "肩膀1", EN: "Shoulder 1" } }),
    chestLayer({ Name: "Sb", Text: { CN: "肩膀2", EN: "Shoulder 2" } }),
    chestLayer({ Name: "Na", Text: { CN: "颈部1", EN: "Neck 1" } }),
    chestLayer({ Name: "Nb", Text: { CN: "颈部2", EN: "Neck 2" } }),
    breastLayer({ Name: "RN", Text: { CN: "右侧乳头", EN: "Right Nipple" } }),
    breastLayer({ Name: "LN", Text: { CN: "左侧乳头", EN: "Left Nipple" } }),
    breastLoLayer({ Name: "LBa", Text: { CN: "左侧胸部1", EN: "Left Breast 1" } }),
    breastLayer({ Name: "LBb", Text: { CN: "左侧胸部2", EN: "Left Breast 2" } }),
    breastLoLayer({ Name: "RB", Text: { CN: "右侧胸部1", EN: "Right Breast 1" } }),
    tummyLayer({ Name: "Ta", Text: { CN: "腹部1", EN: "Tummy 1" } }),
    tummyLayer({ Name: "Tb", Text: { CN: "腹部2", EN: "Tummy 2" } }),
    tummyLayer({ Name: "Tc", Text: { CN: "腹部3", EN: "Tummy 3" } }),
    tummyLayer({ Name: "Td", Text: { CN: "腹部4", EN: "Tummy 4" } }),
    tummyLayer({ Name: "Te", Text: { CN: "腹部5", EN: "Tummy 5" } }),
];

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "咬痕",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    AllowActivePose: [],
    DynamicGroupName: "LuziCustom",
    DefaultColor: "#752626",
    Layer: [
        { Name: "Base", HasImage: false, AllowTypes: {} },
        ...layers.map((layer) => ({ ...layer, AllowTypes: { [layer.Name]: 1 }, CopyLayerColor: "Base" })),
    ],
};

const translation = {
    CN: "咬痕",
    EN: "Bite Mark",
};

const layerNames = {};

const itemsPerPage = 15;

const preset = [
    { FB: 1, Sa: 1, Sb: 0, Na: 0, Nb: 1, RN: 0, LN: 1, LBa: 0, LBb: 1, RB: 0, Ta: 0, Tb: 0, Tc: 1, Td: 0, Te: 1 },
    { FB: 0, Sa: 0, Sb: 0, Na: 0, Nb: 0, RN: 1, LN: 1, LBa: 1, LBb: 1, RB: 1, Ta: 0, Tb: 0, Tc: 0, Td: 0, Te: 0 },
];

const itemDialog = createItemDialogModular([
    {
        location: { x: 1265, y: 450, w: 225, h: 55 },
        key: "预设1",
        show: ({ data }) => data.currentModule === "Base",
        onclick: ({ chara, item }) => ExtendedItemSetOptionByRecord(chara, item, preset[0], { push: false }),
    },
    {
        location: { x: 1510, y: 450, w: 225, h: 55 },
        key: "预设2",
        show: ({ data }) => data.currentModule === "Base",
        onclick: ({ chara, item }) => ExtendedItemSetOptionByRecord(chara, item, preset[1], { push: false }),
    },
]);

/** @type {ModularItemConfig}*/
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    DrawImages: false,
    Modules: layers.map((layer) => ({ Key: layer.Name, Name: layer.Name, Options: [{}, {}] })),
    ScriptHooks: itemDialog.createHooks(),
    DrawData: {
        elementData: Array.from({ length: itemsPerPage }).map((_, idx) => ({
            position: [1135 + 250 * (idx % 3), 550 + 75 * Math.floor(idx / 3)],
        })),
        itemsPerPage,
    },
};

/** @type {Translation.Entry[]} */
const configText = [
    { CN: "无", EN: "None" },
    { CN: "有", EN: "On" },
];

const basicStrings = {
    CN: {
        SelectBase: "配置咬痕样式",
        预设1: "应用预设1",
        预设2: "应用预设2",
    },
    EN: {
        SelectBase: "Configure Bite Mark Style",
        预设1: "Apply Preset 1",
        预设2: "Apply Preset 2",
    },
};

const assetStrings = Object.fromEntries(
    ["CN", "EN"].map((lang) => [
        lang,
        {
            ...basicStrings[lang],
            ...Object.fromEntries(
                layers.flatMap((layer) => [
                    [`Module${layer.Name}`, layer.Text[lang]],
                    [`Select${layer.Name}`, layer.Text[lang]],
                    [`Option${layer.Name}0`, configText[0][lang]],
                    [`Option${layer.Name}1`, configText[1][lang]],
                ])
            ),
        },
    ])
);

export default function () {
    AssetManager.addAssetWithConfig("BodyMarkings", asset, { translation, layerNames, extended, assetStrings });
}
