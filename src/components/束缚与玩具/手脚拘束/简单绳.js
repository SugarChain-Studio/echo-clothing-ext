import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "简单绳",
    Left: 180,
    Top: 220,
    Time: 2,
    Difficulty: 3,
    RemoveTime: 10,
    Extended: false,
    AllowLock: false,
    AllowTighten: true,
    Random: false,
    DefaultColor: "#7B6C4F",
    Effect: [E.Block, E.BlockWardrobe],
    AllowActivePose: ["BackElbowTouch"],
    SetPose: ["BackElbowTouch"],
    ParentGroup: "BodyUpper",
    PoseMapping: {},
};

const translation = {
    CN: "简单绳缚",
    EN: "Simple Rope Bondage",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemArms", asset, { translation, layerNames: {} });
}
