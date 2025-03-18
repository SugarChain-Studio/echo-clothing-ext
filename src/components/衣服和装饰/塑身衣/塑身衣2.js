import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "塑身衣2_Luzi",
    Random: false,
    Top: 0,
    Left: {
        [PoseType.DEFAULT]: 0,
        KneelingSpread: 90,
    },
    Priority: 14,
    SetPose: ["LegsClosed", "Kneel"],
    AllowActivePose: ["LegsClosed", "Kneel"],
    Layer: [
        {
            Name: "上",
            PoseMapping: {
                LegsClosed: PoseType.DEFAULT,
                Kneel: PoseType.DEFAULT,
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "下",
            PoseMapping: {
                LegsClosed: "LegsClosed",
                Kneel: "LegsClosed",
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "上图案",
            PoseMapping: {
                LegsClosed: PoseType.DEFAULT,
                Kneel: PoseType.DEFAULT,
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "下图案",
            PoseMapping: {
                LegsClosed: "LegsClosed",
                Kneel: "LegsClosed",
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "上中线",
            PoseMapping: {
                LegsClosed: PoseType.DEFAULT,
                Kneel: PoseType.DEFAULT,
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "下中线",
            PoseMapping: {
                LegsClosed: "LegsClosed",
                Kneel: "LegsClosed",
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "上线",
            PoseMapping: {
                LegsClosed: PoseType.DEFAULT,
                Kneel: PoseType.DEFAULT,
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "下线",
            PoseMapping: {
                LegsClosed: "LegsClosed",
                Kneel: "LegsClosed",
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "束身衣 2",
    EN: "Satin Corset 2",
};

export default function () {
    AssetManager.addAsset("ClothLower", asset, null, translation);
}
