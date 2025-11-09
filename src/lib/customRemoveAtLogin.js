/**
 * @typedef {Object} RemoveAtLoginItems
 * @property {CustomGroupName} group
 * @property {string} item
 */

import { HookManager } from "@sugarch/bc-mod-hook-manager";

class _CustomValidate {
    constructor() {
        /** @type {RemoveAtLoginItems[]} */
        this.removeList = [];
    }

    /**
     * 注册一个物品在登录时自动移除。
     * @overload
     * @param {CustomGroupName} group - The group the item belongs to.
     * @param {string} item - The item to be removed.
     */
    /**
     * 注册一个物品在登录时自动移除。
     * @overload
     * @param {AddAssetWithConfigParams} params - The asset parameters.
     */
    /**
     * @param {CustomGroupName|AddAssetWithConfigParams} arg0
     * @param {string} [arg1]
     */
    remove(arg0, arg1) {
        if (typeof arg0 === "string" && typeof arg1 === "string") {
            this.removeList.push({ group: arg0, item: arg1 });
        } else if (Array.isArray(arg0)) {
            const [group, asset] = arg0;
            const itemName = asset.Name;
            if (Array.isArray(group)) {
                for (const g of group) {
                    this.removeList.push({ group: g, item: itemName });
                }
            } else {
                this.removeList.push({ group, item: itemName });
            }
        }
    }
}

export const CustomValidate = new _CustomValidate();

HookManager.hookFunction("CharacterAppearanceValidate", 0, (args, next) => {
    const [character] = args;

    const removeSet = new Set(CustomValidate.removeList.map((r) => `${r.group}::${r.item}`));

    if (character.IsPlayer()) {
        character.Appearance = character.Appearance.filter(({ Asset }) => {
            const key = `${Asset.Group.Name}::${Asset.Name}`;
            return !removeSet.has(key);
        });
    }
    return next(args);
});
