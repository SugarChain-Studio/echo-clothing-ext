import { AssetManager } from "../../assetForward";

const asset = {
    Name: "树_Luzi",
    Random: false,
    Top: -110,
    Left: -150,
};

export default function () {
    AssetManager.addAssetWithConfig("ItemDevices", asset, { translation: { CN: "树", EN: "Tree" }, layerNames: {} });
}
