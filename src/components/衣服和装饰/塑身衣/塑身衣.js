import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "塑身衣1_Luzi",
    Random: false,
    Top: 220,
    Left: 130,
    Priority: 14,
    Layer: [
        {
            Name: "上",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                Hogtied: "Hogtied",
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "下",
            ParentGroup: "BodyLower",
            PoseMapping: {
                LegsClosed: "LegsClosed",
                KneelingSpread: "KneelingSpread",
                Kneel: "Kneel",
                Spread: "Spread",
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "上蕾丝边",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "下蕾丝边",
            Priority: 14,
            ParentGroup: "BodyLower",
            PoseMapping: {
                LegsClosed: "LegsClosed",
                KneelingSpread: "KneelingSpread",
                Kneel: "Kneel",
                Spread: "Spread",
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "上蕾丝中",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                Hogtied: "Hogtied",
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "下蕾丝中",
            Priority: 14,
            ParentGroup: "BodyLower",
            PoseMapping: {
                LegsClosed: "LegsClosed",
                KneelingSpread: "KneelingSpread",
                Kneel: "Kneel",
                Spread: "Spread",
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "上边线",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                Hogtied: "Hogtied",
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "下边线",
            Priority: 14,
            ParentGroup: "BodyLower",
            PoseMapping: {
                LegsClosed: "LegsClosed",
                KneelingSpread: "KneelingSpread",
                Kneel: "Kneel",
                Spread: "Spread",
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "上中线",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "下中线",
            Priority: 14,
            ParentGroup: "BodyLower",
            PoseMapping: {
                LegsClosed: "LegsClosed",
                KneelingSpread: "KneelingSpread",
                Kneel: "Kneel",
                Spread: "Spread",
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "下底边",
            Priority: 14,
            ParentGroup: "BodyLower",
            PoseMapping: {
                LegsClosed: "LegsClosed",
                KneelingSpread: "KneelingSpread",
                Kneel: "Kneel",
                Spread: "Spread",
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "上蕾丝上",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                Hogtied: "Hogtied",
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "上钢圈",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                Hogtied: "Hogtied",
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "上肩带",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                Hogtied: "Hogtied",
                AllFours: PoseType.HIDE,
            },
        },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "束身衣 1",
    EN: "Shapewear 1",
};

export default function () {
    AssetManager.addAsset("Bra", asset, null, translation);
}
