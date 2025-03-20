import { AssetManager } from "../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "举手杆",
    Left: 0,
    Top: 0,
    Difficulty: 5,
    Priority: 39,
    Time: 12,
    RemoveTime: 10,
    Extended: false,
    AllowLock: true,
    DrawLocks: true,
    AllowTighten: true,
    Effect: [E.Block, E.BlockWardrobe],
    AllowActivePose: ["OverTheHead"],
    SetPose: ["OverTheHead"],
    ParentGroup: {},
    Layer: [{ Name: "杆子" }, { Name: "颈部" }, { Name: "束带" }],
};

const translations = {
    CN: "举手杆",
    EN: "Hand raised bar",
};

export default function () {
    AssetManager.addAsset("ItemArms", asset, null, translations);
}
