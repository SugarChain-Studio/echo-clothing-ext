import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {AddAssetWithConfigParamsNoGroup[]} */
const asset = [
    [
        {
            Name: "女仆装_Luzi",
            Random: false,
            Gender: "F",
            Top: 0,
            Left: 0,
            Priority: 30,
            Prerequisite: ["HasBreasts"],
            ParentGroup: {},
            PoseMapping: { AllFours: "AllFours", Hogtied: "Hogtied" },
            Layer: [{ Name: "裙子" }, { Name: "围裙" }, { PoseMapping: {}, ParentGroup: {}, Name: "蝴蝶结" }],
        },
        {
            translation: { CN: "女仆装", EN: "Maid Dress", RU: "Костюм горничной" },
            layerNames: { EN: { 裙子: "Skirt", 围裙: "Apron", 蝴蝶结: "Bow" } },
        },
    ],
    [
        {
            Name: "女仆装2_Luzi",
            Random: false,
            Gender: "F",
            Top: 0,
            Left: 0,
            Priority: 30,
            Prerequisite: ["HasBreasts"],
            DefaultColor: ["#3F3F3F", "#808080"],
            Layer: [
                {
                    Name: "裙子",
                    PoseMapping: {
                        Yoked: "Yoked",
                        OverTheHead: "OverTheHead",
                        BackElbowTouch: "BackElbowTouch",
                        BackCuffs: "BackCuffs",
                        AllFours: "Hide",
                        Hogtied: "Hogtied",
                    },
                },
                {
                    Name: "围裙",
                    PoseMapping: {
                        TapedHands: "TapedHands",
                        AllFours: "Hide",
                        Hogtied: "Hogtied",
                    },
                },
            ],
        },
        {
            translation: { CN: "女仆装 2", EN: "Maid Dress 2", RU: "Костюм горничной 2" },
            layerNames: { EN: { 裙子: "Skirt", 围裙: "Apron" } },
        },
    ],
];

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset[0][0], "Arm1");
    ArmMaskTool.createArmMaskForCloth("Cloth", asset[1][0]);
    AssetManager.addAssetWithConfig("Cloth", asset);
}
