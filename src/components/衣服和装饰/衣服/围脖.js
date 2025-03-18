import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "围脖_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 40,
};

/** @type {Translation.Entry} */
const translation = {
    CN: "围脖",
    EN: "Scarf",
};

export default function () {
    AssetManager.addAsset("ClothAccessory", asset, undefined, translation);
}
