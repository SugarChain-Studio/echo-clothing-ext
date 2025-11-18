import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "SND项链",
    Random: false,
    Left: 190,
    Top: 210,
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
    AssetManager.addAssetWithConfig(groups, asset, {
        translation,
        layerNames: {},
    });
    luziSuffixFixups(groups, asset.Name);
}
