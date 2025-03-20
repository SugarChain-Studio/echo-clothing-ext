import { AssetManager } from "../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "分膝杆",
    Left: 59,
    Top: 0,
    Difficulty: 5,
    Priority: 39,
    Time: 12,
    RemoveTime: 10,
    Extended: false,
    AllowLock: true,
    DrawLocks: true,
    AllowTighten: true,
    Effect: [E.Freeze, E.BlockWardrobe],
    AllowActivePose: ["KneelingSpread"],
    SetPose: ["KneelingSpread"],
    ParentGroup: {},
    Layer: [{ Name: "杆子" }, { Name: "束带", ParentGroup: "BodyLower" }],
};

const translations = {
    CN: "分膝杆",
    EN: "Split knee bar",
};

export default function () {
    AssetManager.addAsset("ItemLegs", asset, null, translations);
}
