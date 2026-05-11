import { AssetManager } from "@local/AssetManager";
import { luziSuffixFixups } from "@local/lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "树",
    Random: false,
    Top: -110,
    Left: -150,
};

export default function () {
    AssetManager.addAssetWithConfig("ItemDevices", asset, { translation: { CN: "树", EN: "Tree" }, layerNames: {} });
    luziSuffixFixups(["ItemDevices"], asset.Name);
}
