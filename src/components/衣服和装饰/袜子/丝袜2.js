import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "丝袜2",
    Random: false,
    Top: 0,
    Left: {
        BaseLower: 0,
        Kneel: 0,
        KneelingSpread: 30,
        LegsClosed: 0,
        LegsOpen: 0,
        Spread: 0,
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "丝袜 2",
    EN: "Silk Stockings 2",
    RU: "Шелковые чулки 2",
};

export default function () {
    AssetManager.addAssetWithConfig(["Socks", "SocksLeft", "SocksRight"], asset, { translation });
    luziSuffixFixups(["Socks", "SocksLeft", "SocksRight"], asset.Name);
}
