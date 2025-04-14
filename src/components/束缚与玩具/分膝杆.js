import { AssetManager } from "../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "分膝杆",
    Left: 160,
    Top: 600,
    Difficulty: 5,
    Priority: 39,
    Time: 12,
    RemoveTime: 10,
    Extended: false,
    AllowLock: true,
    DrawLocks: false,
    AllowTighten: true,
    Random: false,
    Effect: [E.Freeze, E.BlockWardrobe],
    AllowActivePose: ["KneelingSpread"],
    SetPose: ["KneelingSpread"],
    ParentGroup: {},
    Layer: [{ Name: "杆子" }, { Name: "束带", ParentGroup: "BodyLower" }, { Name: "Lock", LockLayer: true }],
};

const description = {
    CN: "分膝杆",
    EN: "Knee Spreader",
};

const layerNames = {
    CN: {
        杆子: "杆子",
        束带: "束带",
        Lock: "锁",
    },
    EN: {
        杆子: "Bar",
        束带: "Belt",
        Lock: "Lock",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("ItemLegs", asset, {
        description,
        layerNames,
    });
}
