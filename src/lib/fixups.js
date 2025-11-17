import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { AssetManager } from "../assetForward";

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
