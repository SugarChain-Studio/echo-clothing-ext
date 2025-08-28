import { ArmMaskTool } from "../../../lib";
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
            ColorGroup: "袖子花边",
            PoseMapping: {
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        {
            Name: "袖右",
            ColorGroup: "袖子花边",
            PoseMapping: {
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        { Name: "裙边2", ParentGroup: {} },
        { Name: "裙边", ParentGroup: {} },
        { Name: "裙", ColorGroup: "裙子" },
        { Name: "胸罩", ColorGroup: "裙子" },
        { Name: "束腰左", ColorGroup: "裙子" },
        { Name: "束腰右", ColorGroup: "裙子" },
        { Name: "束腰中", ColorGroup: "裙子" },
        { Name: "束腰绑带" },
        { Name: "腰带", ColorGroup: "蝴蝶结" },
        { Name: "花边" },
        { Name: "蝴蝶结", ColorGroup: "蝴蝶结", ParentGroup: {} },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "褶边连衣裙",
    EN: "Ruffled Dress",
};

/** @type {Translation.String} */
const layerNames = {
    CN: {
        袖左: "左",
        袖右: "右",

        裙: "裙摆",
        束腰左: "腰封左",
        束腰右: "腰封右",
        束腰中: "腰封中",

        裙边2: "裙边(上)",
        裙边: "裙边(下)",

        腰带: "蝴蝶结缎带",

        花边: "文胸花边",
    },
    EN: {
        袖子花边: "Sleeve Frill",
        袖左: "Left",
        袖右: "Right",

        裙子: "Skirt",
        胸罩: "Bra",
        束腰左: "Waist Left",
        束腰右: "Waist Right",
        束腰中: "Waist Middle",
        裙: "Skirt",

        裙边2: "Skirt Edge (Lower)",
        裙边: "Skirt Edge (Upper)",
        束腰绑带: "Waist Strap",
        腰带: "Ribbon",
        花边: "Bra Frill",
        蝴蝶结: "Bow",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset);
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
}
