import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "SND项链_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    PoseMapping: {},
    ParentGroup: {},
    DynamicGroupName: "Necklace",
    Priority: 31,
};

/** @type {Translation.Entry} */
const translation = {
    CN: "SND项链",
    EN: "SND Necklace",
};

export default function () {
    /** @type {AssetGroupBodyName[]} */
    const groups = ["Necklace", "ClothAccessory"];
    for (const group of groups) {
        AssetManager.addAssetWithConfig(group, asset, {
            translation,
            layerNames: {},
        });
    }
}
