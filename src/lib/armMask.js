import { ImageMapTools } from "@mod-utils/Tools";
import { AssetManager } from "../assetForward";
import { cachePreloadGL } from "./cachePreload";

const bodySizes = ["Small", "Normal", "Large", "XLarge", "FlatSmall", "FlatMedium"];

/**
 * @typedef { "" | "Arm1" | "Right" | "Hand" } ArmMaskMode
 */

/** @type { Record<ArmMaskMode,Pick<AssetLayerDefinition, "Name"|"ParentGroup"|"PoseMapping">> } */
const nameRecord = {
    "": { Name: "ArmMask", ParentGroup: "BodyUpper" },
    "Arm1": { Name: "ArmMask1", ParentGroup: "BodyUpper" },
    "Right": { Name: "ArmMaskR", ParentGroup: "BodyUpper", PoseMapping: {} },
    "Hand": { Name: "ArmMaskH", ParentGroup: {} },
};

const argMaskGroup = /** @type {AssetGroupName}*/ ("LuziArmMask");

/** @type {(name:string, size?: string, pose?:AssetPoseName)=>string} */
const maskTexPath = (name, size, pose) => ImageMapTools.assetLayer(argMaskGroup, size ? `${name}_${size}` : name, pose);

for (const size of bodySizes) {
    for (const { Name, ParentGroup, PoseMapping } of Object.values(nameRecord)) {
        const size_ = ParentGroup === "BodyUpper" ? size : undefined;
        cachePreloadGL(maskTexPath(Name, size_));
        if (!PoseMapping) cachePreloadGL(maskTexPath(Name, size_, "TapedHands"));
    }
}

/**
 * @param { CustomGroupName | CustomGroupName [] } groupName
 * @param { string } assetName
 * @param { ArmMaskMode } mode
 */
function createMappings(groupName, assetName, mode) {
    /** @type {Record<string,string>} */
    const ret = {};
    const groupNames = Array.isArray(groupName) ? groupName : [groupName];

    const { Name, ParentGroup } = nameRecord[mode];

    for (const group of groupNames) {
        if (ParentGroup === "BodyUpper") {
            for (const size of bodySizes) {
                const to = `${assetName}_${size}_${Name}`;
                ret[ImageMapTools.assetLayer(group, to)] = maskTexPath(Name, size);
                ret[ImageMapTools.assetLayer(group, to, "TapedHands")] = maskTexPath(Name, size, "TapedHands");
            }
        } else {
            ret[ImageMapTools.assetLayer(group, `${assetName}_${Name}`)] = ImageMapTools.assetLayer(argMaskGroup, Name);
        }
    }

    return ret;
}

/**
 * @param { ArmMaskMode } mode
 * @param { AllowTypes.Definition } [allowTypes]
 * @returns { AssetLayerDefinition }
 */
function createLayerDef(mode, allowTypes) {
    return {
        ...nameRecord[mode],
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
        AllowTypes: allowTypes,
        TextureMask: {},
        BlendingMode: "destination-out",
    };
}

/**
 * 为衣物创建手臂遮罩。
 *
 * 默认遮罩到Top=367；`mode = "Arm1"` 时，遮罩扩展到Top=353
 *
 * @param { CustomGroupName | CustomGroupName [] } groupName
 * @param { CustomAssetDefinition } asset
 * @param { ArmMaskMode } mode
 * @param { AllowTypes.Definition } [allowTypes]
 */
function createArmMaskForCloth(groupName, asset, mode = "", allowTypes) {
    const layerDef = createLayerDef(mode, allowTypes);
    asset.Layer ??= [{}];
    asset.Layer.push(layerDef) ?? (asset.Layer = [layerDef]);
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
