import { HookManager } from "@sugarch/bc-mod-hook-manager";

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

export default function () {
    HookManager.hookFunction("LoginPerformInventoryFixups", 0, (args, next) => {
        LoginInventoryFixups.push(...myFixups);
        return next(args);
    });
}
