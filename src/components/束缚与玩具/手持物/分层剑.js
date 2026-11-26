import { ArmMaskTool } from "@local/lib/generator";
import { AssetManager } from "@local/AssetManager";

/** @type {CustomGroupName} */
const group = "ItemHandheld";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "分层剑",
    Random: false,
    Left: 60,
    Top: 180,
    Difficulty: -10,
    ParentGroup: {},
    IsRestraint: false,
    Fetish: ["Sadism"],
    AllowActivity: ["SpankItem", "RubItem"],
    PoseMapping: { ...AssetPoseMapping.ItemHandheld },
    Layer: [
        { Name: "Handle" },
        { Color: ["#292d33"], Name: "Metal1" },
        { Color: ["#0f0a00"], Name: "Metal2" },
        { Color: ["#ffffff"], Name: "Shine1" },
        { Color: ["#ffe5ca"], Name: "Shine2" },
    ],
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
