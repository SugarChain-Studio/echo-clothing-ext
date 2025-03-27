import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "连体衣_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 26,
    Layer: [
        {
            Name: "6",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: "Hogtied",
            },
        },
        {
            Name: "5",
            PoseMapping: {
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "4",
            PoseMapping: {
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "3",
            PoseMapping: {
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "2",
            PoseMapping: {
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "1",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: "Hogtied",
            },
        },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "连体衣",
    EN: "Jumpsuit",
};

export default function () {
    AssetManager.addAsset("Suit", asset, undefined, translation);
}
