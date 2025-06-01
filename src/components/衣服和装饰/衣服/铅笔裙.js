import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "铅笔裙2",
    Gender: "F",
    Prerequisite: ["HasVagina"],
    Fetish: ["Leather"],
    Left: 0,
    Top: 0,
    PoseMapping: {
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    SetPose: ["LegsClosed"],
    AllowActivePose: ["Kneel"],
    Attribute: ["Skirt"],
};

const translations = {
    CN: "铅笔裙 2", 
    EN: "PencilSkirt 2",
};

export default function () {
    AssetManager.addAsset("ClothLower", asset, null, translations);
}
