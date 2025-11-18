import { AssetManager } from "../../assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { luziSuffixFixups } from "../../lib/fixups";

const assetAdjustments = {
    缩小地上: { OverrideZoom: 0.3 },
    缩小浮空: { OverrideZoom: 0.3 },
    身高加40cm: { ZoomModifier: +0.08 },
    身高加30cm: { ZoomModifier: +0.06 },
    身高加20cm: { ZoomModifier: +0.04 },
    身高加10cm: { ZoomModifier: +0.02 },
    身高减10cm: { ZoomModifier: -0.02 },
    身高减20cm: { ZoomModifier: -0.04 },
    身高减30cm: { ZoomModifier: -0.06 },
    身高减40cm: { ZoomModifier: -0.08 },
};

/** @type { CustomAssetDefinitionAppearance[]} */
const assets = [
    {
        Name: "缩小地上",
        Visible: false,
        Random: false,
        Effect: [E.Slow],
    },
    {
        Name: "缩小浮空",
        Visible: false,
        Random: false,
        OverrideHeight: {
            Height: 400,
            Priority: 20,
            HeightRatioProportion: 0.2,
        },
    },
    {
        Name: "身高加40cm",
        Visible: false,
        Random: false,
    },
    {
        Name: "身高加30cm",
        Visible: false,
        Random: false,
    },
    {
        Name: "身高加20cm",
        Visible: false,
        Random: false,
    },
    {
        Name: "身高加10cm",
        Visible: false,
        Random: false,
    },
    {
        Name: "身高减10cm",
        Visible: false,
        Random: false,
    },
    {
        Name: "身高减20cm",
        Visible: false,
        Random: false,
    },
    {
        Name: "身高减30cm",
        Visible: false,
        Random: false,
    },
    {
        Name: "身高减40cm",
        Visible: false,
        Random: false,
    },
];

/** @type {Translation.CustomRecord<string,string>} */
const translations = {
    CN: {
        缩小地上: "缩小地上",
        缩小浮空: "缩小浮空",
        身高加10cm: "+10cm",
        身高加20cm: "+20cm",
        身高加30cm: "+30cm",
        身高加40cm: "+40cm",
        身高减10cm: "-10cm",
        身高减20cm: "-20cm",
        身高减30cm: "-30cm",
        身高减40cm: "-40cm",
    },
    EN: {
        缩小地上: "Shrink on Ground",
        缩小浮空: "Shrink in Air",
        身高加10cm: "+10cm",
        身高加20cm: "+20cm",
        身高加30cm: "+30cm",
        身高加40cm: "+40cm",
        身高减10cm: "-10cm",
        身高减20cm: "-20cm",
        身高减30cm: "-30cm",
        身高减40cm: "-40cm",
    },
    RU: {
        缩小地上: "Уменьшить на земле",
        缩小浮空: "Уменьшить в воздухе",
        身高加10cm: "+10cm",
        身高加20cm: "+20cm",
        身高加30cm: "+30cm",
        身高加40cm: "+40cm",
        身高减10cm: "-10cm",
        身高减20cm: "-20cm",
        身高减30cm: "-30cm",
        身高减40cm: "-40cm",
    },
};

/** @type {CustomGroupName} */
const groupName = "额外身高_Luzi";

/** @type {Translation.GroupedEntries}*/
const regroupedTranslations = Object.entries(translations).reduce((acc, [lang, entries]) => {
    acc[lang] = { [groupName]: entries };
    return acc;
}, {});

export default function () {
    HookManager.progressiveHook("CharacterAppearanceGetCurrentValue").override((args, next) => {
        /** @type {number} */
        const ret = next(args);
        if (args[1] === "Height" && args[2] === "Zoom") {
            const i = InventoryGet(args[0], /** @type {AssetGroupName} */ (groupName));
            if (i) {
                if (assetAdjustments[i.Asset.Name]?.ZoomModifier)
                    return ret + assetAdjustments[i.Asset.Name].ZoomModifier;
                else if (assetAdjustments[i.Asset.Name]?.OverrideZoom)
                    return assetAdjustments[i.Asset.Name].OverrideZoom;
            }
        }
        return ret;
    });

    AssetManager.addGroupedAssets({ [groupName]: assets }, regroupedTranslations);
    for (const a of assets) {
        luziSuffixFixups(groupName, a.Name);
    }
}
