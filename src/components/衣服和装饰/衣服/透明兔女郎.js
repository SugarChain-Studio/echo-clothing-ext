import { ArmMaskTool } from "../../../armMask";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "透明兔女郎_Luzi",
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
        { Name: "B1" },
        { Name: "B2" },
        { Name: "B3" },
        { Name: "C1" },
        {
            Name: "遮罩",
            BlendingMode: "destination-out",
            TextureMask: {
                Groups: [
                    "BodyUpper",
                    "Bra",
                    "Bra_笨笨蛋Luzi",
                    "SuitLower",
                    "SuitLower_笨笨蛋Luzi",
                    "ItemTorso",
                    "ItemTorso2",
                    "Liquid2_Luzi",
                    "BodyMarkings",
                    "身体痕迹_Luzi",
                    "BodyMarkings2_Luzi",
                ],
            },
        },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "透明兔女郎",
    EN: "透明兔女郎",
};

/** @type {Translation.String} */
const layerNames = {
    CN: {
        A1: "A1",
        A2: "A2",
        B1: "B1",
        B2: "B2",
        B3: "B3",
        C1: "C1",
    },
    EN: {
        A1: "",
        A2: "",
        B1: "",
        B2: "",
        B3: "",
        C1: "",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Suit", asset);
    AssetManager.addAssetWithConfig("Suit", asset, { translation, layerNames });
}
