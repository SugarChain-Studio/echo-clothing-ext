import { AssetManager } from "../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "膝上过夜束缚器",
    Random: false,
    Fetish: ["Leather"],
    Left: 160,
    Top: 570,
    Difficulty: 5,
    Priority: 27,
    Time: 12,
    RemoveTime: 10,
    DefaultColor: ["#505050", "#BBBBBB"],
    Extended: false,
    AllowLock: true,
    AllowTighten: true,
    Block: ["ItemBoots"],
    SetPose: ["LegsClosed"],
    Effect: [E.Slow, E.BlockWardrobe],
    AllowActivePose: ["Kneel", "Hogtied"],
    PoseMapping: {
        LegsClosed: PoseType.DEFAULT,
        Kneel: PoseType.DEFAULT,
        AllFours: PoseType.HIDE,
        Hogtied: PoseType.HIDE,
    },
    Layer: [
        { Name: "Straps", AllowColorize: true },
        { Name: "Details", ParentGroup: {}, AllowColorize: true },
    ],
};

const layerNames = {
    CN: {
        Straps: "束缚带",
        Details: "细节",
    },
    EN: {
        Straps: "Straps",
        Details: "Details",
    },
};

const translation = {
    CN: "膝上过夜束缚器",
    EN: "Over Knee Overnighter",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemLegs", asset, { translation, layerNames });
}
