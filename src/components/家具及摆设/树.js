import { AssetManager } from "../../assetForward";
import { luziSuffixFixups } from "../../lib/fixups";

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
