import { AssetManager } from "../../../assetForward";

/** @type {Partial<CustomAssetDefinitionItem>} */
const itemAttr = {
    AllowLock: true,
    Difficulty: 8,
    Time: 30,
    Audio: "FuturisticApply",
    Effect: [E.BlockMouth],
    Prerequisite: ["GagFlat"],
};

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "EFGlass",
    Random: false,
    Left: 160,
    Top: 130,
    ParentGroup: {},
    DynamicGroupName: "ItemHead",
    Category: ["SciFi"],
    Fetish: ["Metal"],
    DrawLocks: false,
    DefaultColor: ["#421757", "#555555", "#000000", "#B57CC1", "#8F65A3"],
    Layer: [
        { Name: "visor_diff" },
        { Name: "visor_gloss", BlendingMode: "screen", AllowColorize: false },
        { Name: "metal_diff" },
        { Name: "metal_gloss", BlendingMode: "screen", AllowColorize: false },
        { Name: "frame_diff" },
        { Name: "frame_gloss", BlendingMode: "screen", AllowColorize: false },
        { Name: "light1" },
        { Name: "light2" },
    ],
};

const layerNames = {
    CN: {
        frame_diff: "边框",
        metal_diff: "金属",
        visor_diff: "护目镜",
        light2: "灯光2",
        light1: "灯光1",
    },
    EN: {
        frame_diff: "Frame",
        metal_diff: "Metal",
        visor_diff: "Visor",
        light2: "Light 2",
        light1: "Light 1",
    },
};

const translation = {
    CN: "EvilFall 护目镜",
    EN: "EvilFall Visor",
};

const itemAssetBase = /** @type {CustomAssetDefinition} */ ({ ...asset, ...itemAttr });

/** @type {AddAssetWithConfigParams[]} */
const assetN = [
    ["Mask", asset, { layerNames, translation }],
    ["ItemHead", itemAssetBase, { layerNames, translation }],
];

export default function () {
    AssetManager.addAssetWithConfig(assetN);
}
