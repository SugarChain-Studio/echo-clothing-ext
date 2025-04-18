import { ArmMaskTool } from "../../../armMask";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "女仆围裙2_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 31,
    DefaultColor: ["Default", "#000000"],
    PoseMapping: {
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Layer: [
        {
            Name: "裙",
        },
        {
            Name: "扣子",
        },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "女仆围裙 2",
    EN: "Maid's Apron 2",
};

const layerNames = {
    EN: {
        裙: "Skirt",
        扣子: "Button",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset);
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
}
