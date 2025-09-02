import { AssetManager } from "../../assetForward";

export const 淫纹锁_Name = "淫纹锁_Luzi_Padlock";

/** @type { CustomAssetDefinition} */
const asset = {
    Name: 淫纹锁_Name,
    Random: false,
    Wear: false,
    Enable: false,
    Effect: [],
    IsLock: true,
    ExclusiveUnlock: true,
    Time: 10,
    Extended: true,
};

const translation = {
    CN: "魔法刻印",
    EN: "Magic Inscription",
    RU: "Магическая надпись",
    UA: "Магічний напис",
};

/** @type {AssetArchetypeConfig} */
const extended = {
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
};

const assetStrings = {
    CN: { Intro: "画着复杂的文字" },
    EN: { Intro: "Inscripted with complex symbols" },
    RU: { Intro: "Намальовано складними літерами" },
    UA: { Intro: "Намальовано складними літерами" },
};

export default function () {
    AssetManager.addAssetWithConfig("ItemMisc", asset, { translation, extended, layerNames: {}, assetStrings });
}
