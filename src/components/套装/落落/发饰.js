import { AssetManager } from "../../../assetForward";
import { luziFixups } from "../../../lib/fixups";

const hairAccShared = {
    Random: false,
    Priority: 54,
    ParentGroup: {},
    DynamicGroupName: /** @type {AssetGroupBodyName}*/ ("HairAccessory1"),
};

/** @type {AddAssetWithConfigParamsNoGroup[]}} */
const assets = [
    [
        {
            Name: "树叶发饰-Luzi",
            ...hairAccShared,
            Left: 170,
            Top: 80,
        },
        { translation: { CN: "树叶发饰", EN: "Leaf Hairpin" } },
    ],
    [
        {
            Name: "金属发卡-Luzi",
            ...hairAccShared,
            Left: 170,
            Top: 60,
        },
        { translation: { CN: "金属发卡", EN: "Metal Hairpin" } },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(["HairAccessory1", "HairAccessory3"], assets);
    for (const a of assets) {
        luziFixups(["HairAccessory1", "HairAccessory3"], a[0].Name);
    }
}
