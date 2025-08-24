import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {CustomGroupName} */
const group = "ItemHandheld";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "分层剑",
    Random: false,
    Left: 60,
    Top: 180,
    Priority: 34,
    Difficulty: -10,
    ParentGroup: {},
    IsRestraint: false,
    PoseMapping: { ...AssetPoseMapping.ItemHandheld },
    DefaultColor: ["Default", "#292d33", "#0f0a00", "#ffffff", "#ffe5ca"],
    Layer: [{ Name: "Handle" }, { Name: "Metal1" }, { Name: "Metal2" }, { Name: "Shine1" }, { Name: "Shine2" }],
};

const translation = {
    CN: "长剑道具",
    EN: "Longsword Props",
};

const layerNames = {
    CN: {
        Handle: "剑柄",
        Metal1: "金属1",
        Metal2: "金属2",
        Shine1: "光泽1",
        Shine2: "光泽2",
    },
    EN: {
        Handle: "Handle",
        Metal1: "Metal 1",
        Metal2: "Metal 2",
        Shine1: "Highlight 1",
        Shine2: "Highlight 2",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth(group, asset, "Right");
    AssetManager.addAssetWithConfig(group, asset, { translation, layerNames });
}
