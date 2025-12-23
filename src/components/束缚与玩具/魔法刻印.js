import { AssetManager } from "../../assetForward";

export const ASSET_NAME = "淫纹锁LuziPadlock";

/** @type { AddAssetWithConfigParams} */
const asset = [
    "ItemMisc",
    {
        Name: ASSET_NAME,
        Random: false,
        Wear: false,
        Enable: false,
        Effect: [],
        IsLock: true,
        ExclusiveUnlock: true,
        Time: 10,
    },
    {
        translation: {
            CN: "魔法刻印",
            EN: "Magic Inscription",
            RU: "Магическая надпись",
            UA: "Магічний напис",
        },
        extended: {
            Archetype: ExtendedArchetype.NOARCH,
            ScriptHooks: {
                Init: InventoryItemMiscHighSecurityPadlockInitHook,
                Load: InventoryItemMiscHighSecurityPadlockLoadHook,
                Draw: InventoryItemMiscHighSecurityPadlockDrawHook,
                Click: InventoryItemMiscHighSecurityPadlockClickHook,
                Exit: InventoryItemMiscHighSecurityPadlockExitHook,
            },
            BaselineProperty: {
                MemberNumberListKeys: "",
            },
        },
        assetStrings: {
            CN: { Intro: "画着复杂的文字" },
            EN: { Intro: "Inscripted with complex symbols" },
            RU: { Intro: "Намальовано складними літерами" },
            UA: { Intro: "Намальовано складними літерами" },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
