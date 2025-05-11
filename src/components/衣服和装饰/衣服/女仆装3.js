import { ArmMaskTool } from "../../../armMask";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "女仆装3_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 30,
    DefaultColor: [],
    PoseMapping: {
        Hogtied: "Hogtied",
        AllFours: PoseType.HIDE,
    },
    Layer: [
        { Name: "A1" },
        { Name: "A2" },
        { Name: "B1" },
        { Name: "B2" },
        { Name: "B3" },
        { Name: "C1" },
        { Name: "C2" },
        { Name: "C3" },
        { Name: "C4" },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "女仆装 3",
    EN: "Maid Dress 3",
};

/** @type {Translation.String} */
const layerNames = {
    EN: {
        A1: "A1",
        A2: "A2",
        B1: "B1",
        B2: "B2",
        B3: "B3",
        C1: "C1",
        C2: "C2",
        C3: "C3",
        C4: "C4",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset);
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
}
