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

const layerNames = {
    EN: {
        上: "Top",
        下: "Bottom",
        上图案: "Top Pattern",
        下图案: "Bottom Pattern",
        上中线: "Top Center",
        下中线: "Bottom Center",
        上线: "Top Line",
        下线: "Bottom Line",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "束身衣 2",
    EN: "Shapewear 2",
};

export default function () {
    AssetManager.addAssetWithConfig("ClothLower", asset, { layerNames, translation });
}
