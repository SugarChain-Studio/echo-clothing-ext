import { AssetManager } from "../../../assetForward";
import { Typing } from "../../../lib";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "丝袜2_Luzi",
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
    for (const group of Typing.groups(["Socks", "SocksLeft", "SocksRight"])) {
        AssetManager.addAssetWithConfig(group, asset, {
            layerNames: {},
            translation,
        });
    }
}
