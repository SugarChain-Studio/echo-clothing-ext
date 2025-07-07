import { AssetManager } from "../../../assetForward";
import { DialogTools } from "@mod-utils/Tools";
import { ExtendedTools } from "../../../extendedTools";

const hairAccShared = {
    Random: false,
    Left: 0,
    Top: 0,
    Priority: 54,
    ParentGroup: {},
};

/** @type {Array<CustomAssetDefinition>}} */
const assets = [
    {
        Name: "树叶发饰_Luzi",
        ...hairAccShared,
    },
    {
        Name: "金属发卡_Luzi",
        ...hairAccShared,
    },
];

/** @type { Translation.String } */
const translations = {
    CN: {
        树叶发饰_Luzi: "树叶发饰",
        金属发卡_Luzi: "金属发卡",
    },
    EN: {
        树叶发饰_Luzi: "Leaf Hair Accessory",
        金属发卡_Luzi: "Metal Hairpin",
    },
};

/** @type { Translation.String } */
const layerNames = {
    CN: {
    },
    EN: {
    },
};

export default function () {
    /** @type {CustomGroupName[]} */
    const groups = ["HairAccessory1", "HairAccessory3"];
    for (const asset of assets) {
        const translation = DialogTools.pickEntry(translations, asset.Name);
        for (const group of groups) {
            AssetManager.addAssetWithConfig(group, asset, {
                translation,
                layerNames,
                ...ExtendedTools.createLeftRightBoth(asset),
            });
        }
    }
}
