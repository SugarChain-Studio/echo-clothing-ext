import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "靴子1_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    PoseMapping: {
        Kneel: PoseType.HIDE,
        KneelingSpread: PoseType.HIDE,
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Priority: 23,
    Layer: [
        {
            Name: "右",
        },
        {
            Name: "左",
        },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "靴子 1",
    EN: "Boots 1",
};

export default function () {
    AssetManager.addAsset("Shoes", asset, undefined, translation);
}
