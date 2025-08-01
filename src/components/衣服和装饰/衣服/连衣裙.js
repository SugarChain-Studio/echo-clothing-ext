import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "连衣裙_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 26,
    DefaultColor: ["#1F1F1F", "#1F1F1F", "#1F1F1F", "#1F1F1F", "#FFFFFF"],
    PoseMapping: {
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Layer: [
        {
            Name: "绳子",
            ParentGroup: {},
        },
        {
            Name: "裙",
            PoseMapping: {
                TapedHands: "TapedHands",
                BackBoxTie: "BackElbowTouch",
                BackCuffs: "BackElbowTouch",
                BackElbowTouch: "BackElbowTouch",
                OverTheHead: "BackElbowTouch",
                Yoked: "BackElbowTouch",
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        {
            Name: "蝴蝶结小",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
            },
        },
        {
            Name: "蝴蝶结大",
            ParentGroup: {},
        },

        {
            Name: "珠",
            ParentGroup: {},
        },
    ],
};

const layerNames = {
    EN: {
        绳子: "Rope",
        裙: "Dress",
        蝴蝶结小: "Bow Small",
        蝴蝶结大: "Bow Large",
        珠: "Beads",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "交叉吊带连衣裙",
    EN: "Cross Strap Dress",
};

export default function () {
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
}
