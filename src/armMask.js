import { AssetManager } from "./assetForward";

const bodySizes = ["Small", "Normal", "Large", "XLarge", "FlatSmall", "FlatMedium"];

/**
 * @param {CustomGroupName | CustomGroupName []} groupName
 * @param {string} assetName
 */
function createMappings(groupName, assetName) {
    /** @type {Record<string,string>} */
    const ret = {};
    const groupNames = Array.isArray(groupName) ? groupName : [groupName];

    for (const group of groupNames) {
        for (const size of bodySizes) {
            // Assets/Female3DCG/Cloth/绛云墨韵旗袍裙_Luzi_Normal_ArmMask.png
            ret[
                `Assets/Female3DCG/${group}/${assetName}_${size}_ArmMask.png`
            ] = `Assets/Female3DCG/LuziArmMask/ArmMask_${size}.png`;
            ret[
                `Assets/Female3DCG/${group}/TapedHands/${assetName}_${size}_ArmMask.png`
            ] = `Assets/Female3DCG/LuziArmMask/TapedHands/ArmMask_${size}.png`;
        }
    }

    return ret;
}

const layerDef = /** @type {any}*/ ({
    Name: "ArmMask",
    ParentGroup: "BodyUpper",
    PoseMapping: {
        BackBoxTie: PoseType.HIDE,
        BackCuffs: PoseType.HIDE,
        Yoked: PoseType.HIDE,
        OverTheHead: PoseType.HIDE,
        Hogtied: PoseType.HIDE,
        TapedHands: "TapedHands",
    },
    TextureMask: {},
    BlendingMode: "destination-out",
});

/**
 * 为衣物创建手臂遮罩
 * @param {CustomGroupName | CustomGroupName []} groupName
 * @param {CustomAssetDefinition} asset
 */
function createArmMaskForCloth(groupName, asset) {
    if (GameVersion === "R114") return;
    asset.Layer?.push(layerDef) ?? (asset.Layer = [layerDef]);
    AssetManager.addImageMapping(createMappings(groupName, asset.Name));
}

/**
 * 为分组衣物创建手臂遮罩
 * @param {CustomGroupedAssetDefinitions} assets
 */
function createArmMaskForGroupedCloth(assets) {
    if (GameVersion === "R114") return;
    for (const [group, assetArr] of Object.entries(assets)) {
        for (const asset of assetArr) {
            createArmMaskForCloth(/**@type {CustomGroupName}*/ (group), asset);
        }
    }
}

export const ArmMaskTool = {
    createArmMaskForCloth,
    createArmMaskForGroupedCloth,
};
