import { AssetManager } from "../../../assetForward";
import { Typing } from "../../../lib";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "条纹袜_Luzi",
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
    Layer: [
        {
            Name: "袜子",
            Priority: 20,
        },
        {
            Name: "条纹",
            Priority: 20,
        },
    ],
};

const layerNames = {
    EN: {
        袜子: "Socks",
        条纹: "Stripes",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "条纹袜",
    EN: "Striped Socks",
    RU: "Полосатые носки",
};

export default function () {
    for (const group of Typing.groups(["Socks", "SocksLeft", "SocksRight"])) {
        AssetManager.addAssetWithConfig(group, asset, {
            layerNames,
            translation,
        });
    }
}
