import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "牛仔裤_Luzi",
    Random: false,
    Top: 0,
    Left: {
        [PoseType.DEFAULT]: 0,
        KneelingSpread: 90,
    },
    Layer: [
        {
            Name: "扣子",
            Priority: 27,
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        {
            Name: "裤子A1",
            Priority: 26,
            PoseMapping: {
                Kneel: "Kneel",
                KneelingSpread: "KneelingSpread",
                LegsClosed: "LegsClosed",
                Spread: "Spread",
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        {
            Name: "裤子A2",
            Priority: 1,
            PoseMapping: {
                Kneel: PoseType.HIDE,
                KneelingSpread: PoseType.HIDE,
                LegsClosed: "LegsClosed",
                Spread: "Spread",
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "宽松牛仔裤",
    EN: "Baggy Jeans",
};

export default function () {
    AssetManager.addAsset("ClothLower", asset, undefined, translation);
}
