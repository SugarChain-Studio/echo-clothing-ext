import { Logger } from "@mod-utils/log.js";

export { GLImageRenderer } from "./draw.js";
export { PartsMask } from "./partsMask.js";
export { createAfterDrawProcess } from "./afterDraw.js";
export { ChainCanvasCache } from "./chain";

/**
 * @template {Record<string, any>} PersistentData
 * @param { CustomAssetDefinition } asset
 * @param { CustomGroupName | CustomGroupName[] } groupName
 * @param { {beforeDraw?: ExtendedItemCallbacks.BeforeDraw<PersistentData>, afterDraw?: ExtendedItemCallbacks.AfterDraw<PersistentData>, scriptDraw?: ExtendedItemCallbacks.ScriptDraw<PersistentData>} } hooks
 */
export function registerDrawHook(asset, groupName, hooks) {
    const map = {
        beforeDraw: "BeforeDraw",
        afterDraw: "AfterDraw",
        scriptDraw: "ScriptDraw",
    };

    const groups = Array.isArray(groupName) ? groupName : [groupName];
    for (const [key, func] of Object.entries(hooks)) {
        for (const g of groups) {
            // @ts-ignore
            if (globalThis[`Assets${g}${asset.Name}${map[key]}`]) {
                // @ts-ignore
                Logger.warn(`Overriding existing hook: "Assets${g}${asset.Name}${map[key]}"`);
            }
            // @ts-ignore
            globalThis[`Assets${g}${asset.Name}${map[key]}`] = func;
        }
    }
}
