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
    EN: "Transparent Bunny Girl",
};

/** @type {Translation.String} */
const layerNames = {
    CN: {
        A1: "底色 1",
        A2: "底色 2",
        B1: "高光 1",
        B2: "高光 2",
        B3: "高光 3",
        C1: "边缘线",
    },
    EN: {
        A1: "Base color 1",
        A2: "Base Color 2",
        B1: "Highlight 1",
        B2: "Highlight 2",
        B3: "Highlight 3",
        C1: "Edge Line",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Suit", asset);
    AssetManager.addAssetWithConfig("Suit", asset, { translation, layerNames });
}
