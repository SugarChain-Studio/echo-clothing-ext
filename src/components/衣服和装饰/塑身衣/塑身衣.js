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

const layerNames = {
    EN: {
        上: "Top",
        下: "Bottom",
        上蕾丝边: "Top Lace Edge",
        下蕾丝边: "Bottom Lace Edge",
        上蕾丝中: "Top Lace Middle",
        下蕾丝中: "Bottom Lace Middle",
        上边线: "Top Edge Line",
        下边线: "Bottom Edge Line",
        上中线: "Top Middle Line",
        下中线: "Bottom Middle Line",
        下底边: "Bottom Edge",
        上蕾丝上: "Top Lace Top",
        上钢圈: "Top Steel Ring",
        上肩带: "Top Shoulder Strap",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "束身衣 1",
    EN: "Shapewear 1",
};

export default function () {
    AssetManager.addAssetWithConfig("Bra", asset, { layerNames, translation });
}
