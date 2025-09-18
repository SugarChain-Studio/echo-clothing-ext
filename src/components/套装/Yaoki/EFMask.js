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
    Name: "EFMask",
    Random: false,
    Left: 200,
    Top: 160,
    ParentGroup: {},
    DynamicGroupName: "ItemMouth",
    Category: ["SciFi"],
    Fetish: ["Metal"],
    DrawLocks: false,
    DefaultColor: ["#131313", "#7F7F7F", "#C873B7", "#421757", "#B57CC1"],
    Layer: [
        { Name: "frame_diff" },
        { Name: "frame_gloss", BlendingMode: "screen", AllowColorize: false },
        { Name: "metal_diff" },
        { Name: "metal_gloss", BlendingMode: "screen", AllowColorize: false },
        { Name: "light2" },
        { Name: "mask_diff" },
        { Name: "mask_gloss", BlendingMode: "screen", AllowColorize: false },
        { Name: "light1" },
    ],
};

const layerNames = {
    CN: {
        frame_diff: "边框",
        metal_diff: "金属",
        light2: "灯光2",
        mask_diff: "面具",
        light1: "灯光1",
    },
    EN: {
        frame_diff: "Frame",
        metal_diff: "Metal",
        light2: "Light 2",
        mask_diff: "Mask",
        light1: "Light 1",
    },
};

const translation = {
    CN: "EvilFall 面具",
    EN: "EvilFall Mask",
};

const itemAssetBase = /** @type {CustomAssetDefinition} */ ({ ...asset, ...itemAttr });

/** @type {AddAssetWithConfigParams[]} */
const assetN = [
    ["Mask", asset, { layerNames, translation }],
    ["ItemMouth", itemAssetBase, { layerNames, translation }],
    ["ItemMouth2", { ...itemAssetBase, Block: ["ItemMouth"] }, { layerNames, translation }],
    ["ItemMouth3", { ...itemAssetBase, Block: ["ItemMouth", "ItemMouth2"] }, { layerNames, translation }],
];

export default function () {
    AssetManager.addAssetWithConfig(assetN);
}
