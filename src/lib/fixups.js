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
 * @param {string} name
 */
export function luziFixups(groups, name) {
    if (!name.includes("-")) return;
    for (const group of getManyMirrors(groups)) {
        myFixups.push({
            Old: { Group: group, Name: name.replace("-", "_") },
            New: { Group: /** @type {AssetGroupName} */ (group), Name: name },
        });
    }
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
