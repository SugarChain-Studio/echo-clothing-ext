import { AssetManager } from "@local/AssetManager";
import { luziSuffixFixups } from "@local/lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "围脖",
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
    AssetManager.addAssetWithConfig("ClothAccessory", asset, { translation, layerNames: {} });
    luziSuffixFixups("ClothAccessory", asset.Name);
}
