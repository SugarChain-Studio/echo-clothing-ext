import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "举手杆",
    Left: 130,
    Top: 60,
    Difficulty: 5,
    Priority: 39,
    Time: 12,
    RemoveTime: 10,
    Extended: false,
    AllowLock: true,
    DrawLocks: false,
    AllowTighten: true,
    Random: false,
    Effect: [E.Block, E.BlockWardrobe],
    AllowActivePose: ["OverTheHead"],
    SetPose: ["OverTheHead"],
    ParentGroup: {},
    Layer: [{ Name: "杆子" }, { Name: "颈部" }, { Name: "束带" }, { Name: "Lock", LockLayer: true }],
};

const translation = {
    CN: "举手杆",
    EN: "Hand raised bar",
};

const layerNames = {
    CN: {
        杆子: "杆子",
        颈部: "颈部",
        束带: "束带",
        Lock: "锁",
    },
    EN: {
        杆子: "Bar",
        颈部: "Neck",
        束带: "Belt",
        Lock: "Lock",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("ItemArms", asset, { translation, layerNames });
}
