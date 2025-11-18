import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {AddAssetWithConfigParamsNoGroup[]} */
const assets = [
    [
        {
            Name: "斗笠1",
            Random: false,
            Gender: "F",
            Top: 0,
            Left: 0,
        },
        { translation: { CN: "斗笠 1", EN: "Bamboo hat 1", RU: "DouLi 1" } },
    ],
    [
        {
            Name: "斗笠2",
            Random: false,
            Gender: "F",
            Top: 0,
            Left: 0,
        },
        { translation: { CN: "斗笠 2", EN: "Bamboo hat 2", RU: "DouLi 2" } },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig("Hat", assets);
    for (const a of assets) {
        luziSuffixFixups("Hat", a[0].Name);
    }
}
