import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "奶牛_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Prerequisite: ["HasBreasts"],
    PoseMapping: {
        TapedHands: PoseType.DEFAULT,
        Yoked: PoseType.DEFAULT,
        OverTheHead: PoseType.DEFAULT,
        BackBoxTie: PoseType.DEFAULT,
        BackElbowTouch: PoseType.DEFAULT,
        BackCuffs: PoseType.DEFAULT,
        AllFours: "Hide",
        Hogtied: "Hide",
    },
    Layer: [
        {
            Name: "衣服",
            Priority: 26,
        },
        {
            Name: "边缘",
            Priority: 26,
        },
    ],
};

const layerNames = {
    EN: {
        衣服: "Clothes",
        边缘: "Edge",
    },
};

const translation = {
    CN: "奶牛",
    EN: "Cow",
    RU: "Корова",
};

export default function () {
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
}
