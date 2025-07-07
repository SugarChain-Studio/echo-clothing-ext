import { AssetManager } from "../../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

const hairAccShared = {
    Random: false,
    Priority: 54,
    ParentGroup: {},
    DynamicGroupName: /** @type {AssetGroupBodyName}*/ ("HairAccessory1"),
};

/** @type {Array<CustomAssetDefinition>}} */
const assets = [
    {
        Name: "树叶发饰_Luzi",
        ...hairAccShared,
        Left: 170,
        Top: 80,
    },
    {
        Name: "金属发卡_Luzi",
        ...hairAccShared,
        Left: 170,
        Top: 60,
    },
];

/** @type { Translation.String } */
const translations = {
    CN: {
        树叶发饰_Luzi: "树叶发饰",
        金属发卡_Luzi: "金属发卡",
    },
    EN: {
        树叶发饰_Luzi: "Leaf Hairpin",
        金属发卡_Luzi: "Metal Hairpin",
    },
};

export default function () {
    /** @type {AssetGroupBodyName[]} */
    const groups = ["HairAccessory1", "HairAccessory3"];

    for (const asset of assets) {
        const translation = DialogTools.pickEntry(translations, asset.Name);
        for (const group of groups) {
            AssetManager.addAssetWithConfig(group, asset, {
                translation,
                layerNames: {},
            });
        }
    }
}
