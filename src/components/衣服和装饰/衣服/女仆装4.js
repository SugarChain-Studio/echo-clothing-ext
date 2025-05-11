import { ArmMaskTool } from "../../../armMask";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "女仆装4_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 30,
    PoseMapping: {
        Hogtied: "Hogtied",
        AllFours: PoseType.HIDE,
    },
    Layer: [
        { Name: "A1" },
        { Name: "A2" },
        { Name: "A3" },
        { Name: "A4" },
        { Name: "A5" },
        { Name: "A6" },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "女仆装4",
    EN: "Maid Dress 4",
};

/** @type {Translation.String} */
const layerNames = {
    EN: {
        A1: "A1",
        A2: "A2",
        A3: "A3",
        A4: "A4",
        A5: "A5",
        A6: "A6",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset);
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
} 