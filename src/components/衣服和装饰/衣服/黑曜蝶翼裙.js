import { ArmMaskTool } from "../../../armMask";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "黑曜蝶翼裙_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 30,
    PoseMapping: {
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Layer: [
        { Name: "A1" },
        { Name: "A2" },
        { Name: "B1" },
        { Name: "B2" },
        { Name: "C1" },
        { Name: "C2" },
        { Name: "D1" },
        { Name: "D2" },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "黑曜蝶翼裙",
    EN: "Neme",
};

/** @type {Translation.String} */
const layerNames = {
    CN: {
        A1: "A1",
        A2: "A2",
        B1: "B1",
        B2: "B2",
        C1: "C1",
        C2: "C2",
        D1: "D1",
        D2: "D2",
    },
    EN: {
        A1: "A1",
        A2: "A2",
        B1: "B1",
        B2: "B2",
        C1: "C1",
        C2: "C2",
        D1: "D1",
        D2: "D2",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("ClothLower", asset);
    AssetManager.addAssetWithConfig("ClothLower", asset, { translation, layerNames });
}
