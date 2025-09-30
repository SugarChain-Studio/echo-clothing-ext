import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "丝袜_Luzi",
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
    CN: "丝袜",
    EN: "Silk Stockings",
    RU: "Шелковые чулки",
};

export default function () {
    AssetManager.addAssetWithConfig(["Socks", "SuitLower"], asset, { translation });
}
