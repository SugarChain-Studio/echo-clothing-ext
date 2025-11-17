import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { luziFixups } from "../../../lib/fixups";

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        ["Socks", "SocksLeft", "SocksRight"],
        {
            Name: "条纹袜-Luzi",
            Random: false,
            ...Tools.topLeftBuilder({ Top: 0, Left: 0 }, ["KneelingSpread", { Left: 30 }]),
            Layer: [
                { Name: "袜子", Priority: 20 },
                { Name: "条纹", Priority: 20 },
            ],
        },
        {
            translation: {
                CN: "条纹袜",
                EN: "Striped Socks",
                RU: "Полосатые носки",
            },
        },
    ],
    [
        ["Socks", "SocksLeft", "SocksRight"],
        {
            Name: "条纹袜2-Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Priority: 20,
            DefaultColor: ["#272020", "#221717", "#221717"],
            Layer: [{ Name: "袜子" }, { Name: "条纹" }, { Name: "袜边" }],
        },
        {
            translation: {
                CN: "条纹袜 2",
                EN: "Striped Socks 2",
                RU: "Полосатые носки 2",
            },
            layerNames: {
                EN: { 袜子: "Socks", 条纹: "Stripes", 袜边: "SockEdge" },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
    for (const a of asset) {
        luziFixups(a[0], a[1].Name);
    }
}
