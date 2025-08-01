import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "裙_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 26,
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    SetPose: ["LegsClosed"],
    AllowActivePose: ["Kneel", "LegsClosed"],
    DefaultColor: ["#7F1739", "Default", "Default"],
    Layer: [
        {
            Name: "底面",
            Priority: 1,
            ParentGroup: {},
            PoseMapping: {
                Kneel: "Kneel",
                LegsClosed: PoseType.DEFAULT,
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "上裙子",
            PoseMapping: {
                Kneel: PoseType.DEFAULT,
                LegsClosed: PoseType.DEFAULT,
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "下裙子",
            PoseMapping: {
                Kneel: "Kneel",
                LegsClosed: PoseType.DEFAULT,
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "上拉链",
            PoseMapping: {
                Kneel: PoseType.DEFAULT,
                LegsClosed: PoseType.DEFAULT,
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "下拉链",
            PoseMapping: {
                Kneel: "Kneel",
                LegsClosed: PoseType.DEFAULT,
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "上亮面",
            PoseMapping: {
                Kneel: PoseType.DEFAULT,
                LegsClosed: PoseType.DEFAULT,
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "下亮面",
            PoseMapping: {
                Kneel: "Kneel",
                LegsClosed: PoseType.DEFAULT,
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "上高光",
            PoseMapping: {
                Kneel: PoseType.DEFAULT,
                LegsClosed: PoseType.DEFAULT,
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "下高光",
            PoseMapping: {
                Kneel: "Kneel",
                LegsClosed: PoseType.DEFAULT,
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
    ],
};

const layerNames = {
    EN: {
        底面: "Base",
        上裙子: "Top Skirt",
        下裙子: "Bottom Skirt",
        上拉链: "Top Zipper",
        下拉链: "Bottom Zipper",
        上亮面: "Top Gloss",
        下亮面: "Bottom Gloss",
        上高光: "Top Highlight",
        下高光: "Bottom Highlight",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "开叉半身直筒裙",
    EN: "Slit Column Skirt",
};

export default function () {
    AssetManager.addAssetWithConfig("ClothLower", asset, { translation, layerNames });
}
