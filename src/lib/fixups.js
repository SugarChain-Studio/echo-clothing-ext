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

/** @param {PlayerCharacter} player */
function performWardrobeFixup(player) {
    /** @type {Map<string, CustomLoginInventoryFixup["New"]>} */
    const oldNewMap = new Map(myFixups.map((fixup) => [`${fixup.Old.Group}::${fixup.Old.Name}`, fixup.New]));

    for (const dressup of player.Wardrobe) {
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
    LoginInventoryFixups.push(...myFixups);
});

HookManager.hookFunction("LoginPerformCraftingFixups", 0, (args, next) => {
    performWardrobeFixup(Player);

    return next(args);
});
