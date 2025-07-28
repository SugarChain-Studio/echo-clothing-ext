import { AssetManager } from "../../../assetForward";
import { Typing } from "../../../utils";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "条纹袜2_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    DefaultColor: ["#272020", "#221717", "#221717"],
    Layer: [
        {
            Name: "袜子",
            Priority: 20,
        },
        {
            Name: "条纹",
            Priority: 20,
        },
        {
            Name: "袜边",
            Priority: 20,
        },
    ],
};

const layerNames = {
    EN: {
        袜子: "Socks",
        条纹: "Stripes",
        袜边: "SockEdge",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "条纹袜 2",
    EN: "Striped Socks 2",
    RU: "Полосатые носки 2",
};

export default function () {
    for (const group of Typing.groups(["Socks", "SocksLeft", "SocksRight"])) {
        AssetManager.addAssetWithConfig(group, asset, {
            layerNames,
            translation,
        });
    }
}
