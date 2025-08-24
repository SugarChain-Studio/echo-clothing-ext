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
        { Name: "裙边2", ParentGroup: {} },
        { Name: "裙边", ParentGroup: {} },
        { Name: "裙" },
        { Name: "胸罩" },
        { Name: "束腰左", ColorGroup: "束腰" },
        { Name: "束腰右", ColorGroup: "束腰" },
        { Name: "束腰中", ColorGroup: "束腰" },
        { Name: "束腰绑带" },
        { Name: "腰带" },
        { Name: "花边" },
        { Name: "蝴蝶结", ParentGroup: {} },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "褶边连衣裙",
    EN: "Ruffled Dress",
};

/** @type {Translation.String} */
const layerNames = {
    EN: {
        袖左: "Left Sleeve",
        袖右: "Right Sleeve",
        裙边2: "Skirt Edge 2",
        裙边: "Skirt Edge",
        裙: "Skirt",
        胸罩: "Bra",
        束腰: "Waist",
        束腰左: "Waist Left",
        束腰右: "Waist Right",
        束腰中: "Waist Middle",
        束腰绑带: "Waist Strap",
        腰带: "Belt",
        花边: "Lace",
        蝴蝶结: "Bow",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset);
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
}
