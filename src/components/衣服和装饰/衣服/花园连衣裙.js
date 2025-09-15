import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { PoseMapTools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "花园连衣裙",
    Random: false,
    Left: 90,
    Top: 210,
    PoseMapping: PoseMapTools.HideFullBody(),
    DefaultColor: ["Default", "Default", "Default", "#303030", "Default"],
    Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "A3" }, { Name: "A4" }, { Name: "A5" }],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "花园连衣裙",
    EN: "Garden Dress",
};

/** @type {Translation.String} */
const layerNames = {
    CN: {
        A1: "底部花边",
        A2: "摸胸",
        A3: "肩花边",
        A4: "裙子",
        A5: "领结",
    },
    EN: {
        A1: "Bottom Lace",
        A2: "Chest",
        A3: "Shoulder Lace",
        A4: "Dress",
        A5: "Bowknot",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset);
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
}
