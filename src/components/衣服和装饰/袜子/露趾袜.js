import { AssetManager } from "../../../assetForward";
import { Typing } from "../../../utils";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "露趾袜_Luzi",
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
    CN: "露趾袜",
    EN: "Stirrup Thigh High Socks",
    RU: "Чулки с открытыми пальцами",
};

export default function () {
    for (const group of Typing.groups(["Socks", "SocksLeft", "SocksRight"])) {
        AssetManager.addAssetWithConfig(group, asset, {
            layerNames: {},
            translation,
        });
    }
}
