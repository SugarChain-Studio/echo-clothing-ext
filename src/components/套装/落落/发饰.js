import { AssetManager } from "@local/AssetManager";
import { luziSuffixFixups } from "@local/lib/fixups";

const hairAccShared = /** @type {const} */ ({
    Random: false,
    Priority: 54,
    ParentGroup: {},
    DynamicGroupName: /** @type {AssetGroupBodyName}*/ ("HairAccessory1"),
});

/** @type {AddAssetWithConfigParamsNoGroup[]}} */
const assets = [
    [
        {
            Name: "树叶发饰",
            ...hairAccShared,
            Left: 170,
            Top: 80,
        },
        { translation: { CN: "树叶发饰", EN: "Leaf Hairpin" } },
    ],
    [
        {
            Name: "金属发卡",
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
        luziSuffixFixups(["HairAccessory1", "HairAccessory3"], a[0].Name);
    }
}
