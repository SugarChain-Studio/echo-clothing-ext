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
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "牛仔裤",
    EN: "Jeans",
};

export default function () {
    AssetManager.addAsset("ClothLower", asset, undefined, translation);
}
