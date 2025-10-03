import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "枪套_Luzi",
    Random: false,
    Left: 110,
    Top: 430,
    Priority: 20,
    ParentGroup: "BodyLower",
    DynamicGroupName: "Garters",
    PoseMapping: { ...AssetPoseMapping.Garters, Kneel: "Kneel", KneelingSpread: "KneelingSpread" },
};

const translation = {
    CN: "枪套",
    EN: "Holster",
};

export default function () {
    AssetManager.addAssetWithConfig(["Garters", "ClothAccessory"], asset, {
        translation,
        layerNames: {},
    });
}
