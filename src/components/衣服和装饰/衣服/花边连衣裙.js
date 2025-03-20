import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "花边连衣裙",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 30,
    DefaultColor: [
        "#3F3F3F",
        "#3F3F3F",
        "#9B3131",
        "#3F3F3F",
        "#9B3131",
        "#9B3131",
        "#9B3131",
        "#9B3131",
        "#9B3131",
        "#3F3F3F",
        "#3F3F3F",
        "#323232",
        "#3F3F3F",
    ],
    PoseMapping: {
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Layer: [
        {
            Name: "袖左",
            PoseMapping: {
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        {
            Name: "袖右",
            PoseMapping: {
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        {
            Name: "裙边2",
            ParentGroup: {},
        },
        {
            Name: "裙边",
            ParentGroup: {},
        },
        {
            Name: "裙",
        },
        {
            Name: "胸罩",
        },
        {
            Name: "束腰左",
        },
        {
            Name: "束腰右",
        },
        {
            Name: "束腰中",
        },
        {
            Name: "束腰绑带",
        },
        {
            Name: "腰带",
        },
        {
            Name: "花边",
        },
        {
            Name: "蝴蝶结",
            ParentGroup: {},
        },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "褶边连衣裙",
    EN: "Ruffled Dress",
};

export default function () {
    AssetManager.addAsset("Cloth", asset, undefined, translation);
}
