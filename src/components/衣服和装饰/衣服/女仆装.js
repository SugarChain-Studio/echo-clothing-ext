import { ArmMaskTool } from "../../../armMask";
import { AssetManager } from "../../../assetForward";

/** @type {CustomGroupedAssetDefinitions} */
const asset = {
    Cloth: [
        {
            Name: "女仆装_Luzi",
            Random: false,
            Gender: "F",
            Top: 0,
            Left: 0,
            Priority: 30,
            Prerequisite: ["HasBreasts"],
            ParentGroup: {},
            PoseMapping: {
                AllFours: "AllFours",
                Hogtied: "Hogtied",
            },
            Layer: [
                {
                    Name: "裙子",
                },
                {
                    Name: "围裙",
                },
                {
                    PoseMapping: {},
                    ParentGroup: {},
                    Name: "蝴蝶结",
                },
            ],
        },
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
    ],
};

const translations = {
    CN: {
        Cloth: {
            女仆装_Luzi: "女仆装",
            女仆装2_Luzi: "女仆装 2",
        },
    },
    EN: {
        Cloth: {
            女仆装_Luzi: "Maid Dress",
            女仆装2_Luzi: "Maid Dress 2",
        },
    },
    RU: {
        Cloth: {
            女仆装_Luzi: "Костюм горничной",
            女仆装2_Luzi: "Костюм горничной 2",
        },
    },
};

const layerNames = {
    EN: {
        Cloth: {
            女仆装_Luzi: {
                裙子: "Skirt",
                围裙: "Apron",
                蝴蝶结: "Bow",
            },
            女仆装2_Luzi: {
                裙子: "Skirt",
                围裙: "Apron",
            },
        },
    },
};

export default function () {
    ArmMaskTool.createArmMaskForGroupedCloth(asset, { Cloth: { 女仆装_Luzi: "Arm1" } });
    AssetManager.addGroupedAssetsWithConfig(asset, translations, layerNames);
}
