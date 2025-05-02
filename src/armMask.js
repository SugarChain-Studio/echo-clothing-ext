import { AssetManager } from "./assetForward";

const bodySizes = ["Small", "Normal", "Large", "XLarge", "FlatSmall", "FlatMedium"];

/**
 * @typedef {"" | "Arm1"} ArmMaskMode
 */

/** @type {Record<ArmMaskMode,string>} */
const nameRecord = {
    "": "ArmMask",
    "Arm1": "ArmMask1",
};

/**
 * @param {CustomGroupName | CustomGroupName []} groupName
 * @param {string} assetName
 * @param { ArmMaskMode } mode
 */
function createMappings(groupName, assetName, mode) {
    /** @type {Record<string,string>} */
    const ret = {};
    const groupNames = Array.isArray(groupName) ? groupName : [groupName];

    const maskName = nameRecord[mode];

    for (const group of groupNames) {
        for (const size of bodySizes) {
            // Assets/Female3DCG/Cloth/绛云墨韵旗袍裙_Luzi_Normal_ArmMask.png
            ret[
                `Assets/Female3DCG/${group}/${assetName}_${size}_${maskName}.png`
            ] = `Assets/Female3DCG/LuziArmMask/${maskName}_${size}.png`;
            ret[
                `Assets/Female3DCG/${group}/TapedHands/${assetName}_${size}_${maskName}.png`
            ] = `Assets/Female3DCG/LuziArmMask/TapedHands/${maskName}_${size}.png`;
        }
    }

    return ret;
}

/**
 * @param { ArmMaskMode } mode
 * @returns {AssetLayerDefinition}
 */
function createLayerDef(mode) {
    return {
        Name: nameRecord[mode],
        ParentGroup: "BodyUpper",
        PoseMapping: {
            BackBoxTie: PoseType.HIDE,
            BackCuffs: PoseType.HIDE,
            BackElbowTouch: PoseType.HIDE,
            Yoked: PoseType.HIDE,
            OverTheHead: PoseType.HIDE,
            Hogtied: PoseType.HIDE,
            TapedHands: "TapedHands",
        },
        Top: 0,
        Left: 0,
        TextureMask: {},
        BlendingMode: "destination-out",
    };
}

/**
 * 为衣物创建手臂遮罩。
 *
 * 默认遮罩到Top=367；`mode = "Arm1"` 时，遮罩扩展到Top=353
 *
 * @param {CustomGroupName | CustomGroupName []} groupName
 * @param {CustomAssetDefinition} asset
 * @param {ArmMaskMode} mode
 */
function createArmMaskForCloth(groupName, asset, mode = "") {
    const layerDef = createLayerDef(mode);
    asset.Layer?.push(layerDef) ?? (asset.Layer = [layerDef]);
    AssetManager.addImageMapping(createMappings(groupName, asset.Name, mode));
}

/**
 * @typedef {Partial<Record<CustomGroupName, Record<string,ArmMaskMode>>>} GroupedAssetMaskMode
 */

/**
 * 为分组衣物创建手臂遮罩。
 *
 * 默认遮罩到Top=367；`mode = "Arm1"` 时，遮罩扩展到Top=353
 *
 * @param {CustomGroupedAssetDefinitions} assets
 * @param {ArmMaskMode | GroupedAssetMaskMode} mode
 */
function createArmMaskForGroupedCloth(assets, mode = "") {
    if (GameVersion === "R114") return;

    const resolveMode = typeof mode === "string" ? (_1, _2) => mode : (group, asset) => mode[group][asset.Name] ?? "";

    for (const [group, assetArr] of Object.entries(assets)) {
        for (const asset of assetArr) {
            createArmMaskForCloth(/**@type {CustomGroupName}*/ (group), asset, resolveMode(group, asset));
        }
    }
}

export const ArmMaskTool = {
    createArmMaskForCloth,
    createArmMaskForGroupedCloth,
};
