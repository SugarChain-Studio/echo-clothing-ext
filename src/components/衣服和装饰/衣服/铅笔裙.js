import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "铅笔裙2",
    Gender: "F",
    Prerequisite: ["HasVagina"],
    Fetish: ["Leather"],
    Left: 160,
    Top: 390,
    Random: false,
    PoseMapping: {
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    SetPose: ["LegsClosed"],
    AllowActivePose: ["Kneel"],
    Attribute: ["Skirt"],
};

const translation = {
    CN: "铅笔裙 2",
    EN: "PencilSkirt 2",
};

export default function () {
    AssetManager.addAssetWithConfig("ClothLower", asset, { layerNames: {}, translation });
}
