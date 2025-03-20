import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "裙子_Luzi",
    Random: false,
    Top: 0,
    Left: {
        [PoseType.DEFAULT]: 0,
        KneelingSpread: 90,
    },
    Priority: 26,
    DefaultColor: ["#560E0E", "#560E0E", "#1F1F1F"],
    PoseMapping: {
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Layer: [
        {
            Name: "上",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        {
            Name: "下",
            PoseMapping: {
                Kneel: "Kneel",
                KneelingSpread: "KneelingSpread",
                LegsClosed: PoseType.DEFAULT,
                Spread: PoseType.DEFAULT,
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        {
            Name: "扣子",
            ParentGroup: {},
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "呢子高腰裙子",
    EN: "Woolen High Waist Skirt",
};

export default function () {
    AssetManager.addAsset("ClothLower", asset, undefined, translation);
}
