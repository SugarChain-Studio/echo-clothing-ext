import { AssetManager } from "../../../assetForward";
import { luziFixups } from "../../../lib/fixups";

/** @type { AddAssetWithConfigParams[] }} */
const assets = [
    [
        ["Wings", "ClothAccessory"],
        {
            Name: "蝴蝶结背饰-Luzi",
            Random: false,
            Top: -110,
            Left: 0,
            DynamicGroupName: "Wings",
        },
        { translation: { CN: "大蝴蝶结装饰", EN: "Large Bow Accessory" } },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(assets);
    for (const asset of assets) {
        luziFixups(asset[0], asset[1].Name);
    }
}
