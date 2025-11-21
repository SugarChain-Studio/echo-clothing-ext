import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { AssetManager } from "../assetForward";
import { getManyMirrors } from "../components/功能调整/复制身体区域";

/**
 * @type {(typeof LoginInventoryFixups)}
 */
const myFixups = [];

/**
 * @param {CustomLoginInventoryFixup} fixup
 */
export function customFixup(fixup) {
    myFixups.push(/** @type {typeof myFixups[number]} */ (fixup));
}

/**
 * @param {CustomGroupName | CustomGroupName[]} groups
 * @param {string} oldName
 * @param {string} newName
 */
export function groupFixup(groups, oldName, newName) {
    for (const group of getManyMirrors(groups)) {
        myFixups.push({
            Old: { Group: group, Name: oldName },
            New: { Group: /** @type {AssetGroupName} */ (group), Name: newName },
        });
    }
}

/**
 * @param {CustomGroupName | CustomGroupName[]} groups
 * @param {string} name
 */
export function luziSuffixFixups(groups, name) {
    const oldName = `${name}_Luzi`;
    groupFixup(groups, oldName, name);
}

/**
 * @param {CustomGroupName | CustomGroupName[]} groups
 * @param {string} name
 * @param {string} [oldName]
 */
export function luziPrefixFixups(groups, name, oldName) {
    const oldName_ = oldName || `Luzi_${name}`;
    groupFixup(groups, oldName_, name);
}
/** @type {Map<string, CustomLoginInventoryFixup["New"]>} */
const oldNewMap = new Map();

/** @param {PlayerCharacter} player */
function performWardrobeFixup(player) {
    // 在此时，Wardrobe或者Wardrobe的元素可能是null，与类型定义不符
    if (!Array.isArray(player.Wardrobe)) return;
    for (const dressup of player.Wardrobe) {
        if (!Array.isArray(dressup)) continue;
        for (const dress of dressup) {
            const key = `${dress.Group}::${dress.Name}`;
            if (oldNewMap.has(key)) {
                const newInfo = oldNewMap.get(key);
                dress.Group = /** @type {AssetGroupName}*/ (newInfo.Group);
                dress.Name = newInfo.Name;
            }
        }
    }
}

AssetManager.afterLoad(() => {
    myFixups
        .map((fixup) => /** @type {const}*/ ([`${fixup.Old.Group}::${fixup.Old.Name}`, fixup.New]))
        .forEach(([key, newInfo]) => {
            oldNewMap.set(key, newInfo);
        });

    LoginInventoryFixups.push(...myFixups);
});

HookManager.hookFunction("LoginPerformCraftingFixups", 0, (args, next) => {
    performWardrobeFixup(Player);

    return next(args);
});

HookManager.hookFunction("AssetGet", 0, (args, next) => {
    const itemKey = `${args[1]}::${args[2]}`;
    if (oldNewMap.has(itemKey)) {
        const newInfo = oldNewMap.get(itemKey);
        args[1] = /** @type {AssetGroupName}*/ (newInfo.Group);
        args[2] = newInfo.Name;
    }

    return next(args);
});
