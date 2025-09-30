import { monadic } from "@mod-utils/monadic";
import { AssetManager } from "@sugarch/bc-asset-manager";

/**
 * @typedef {Object} FullMaskWork
 * @property {CustomGroupName} group
 * @property {string} asset
 * @property {string[]} [layers]
 */

/** @type {FullMaskWork[]} */
const wkList = [];

/**
 * @property {CustomGroupName[] | undefined} group
 */
let groups = undefined;

/**
 * @param {FullMaskWork} wk
 */
function runFullMask({ group, asset, layers }) {
    const nGroups = groups.filter((g) => g !== group);
    monadic(AssetGet("Female3DCG", /** @type {AssetGroupName} */ (group), asset))
        .then((asset) => asset.Layer.filter((l) => l.Alpha.length > 0 && (!layers || layers.includes(l.Name))))
        .filter((ls) => ls.length > 0)
        .then((ls) =>
            ls.forEach((l) =>
                l.Alpha.forEach((a) => {
                    /** @type {Mutable<Alpha.Data>} */ (a).Group = nGroups;
                })
            )
        );
}

export const FullMask = {
    /**
     * @param {CustomGroupName | CustomGroupName[]} group
     * @param {string} asset
     * @property {string[]} [layers]
     */
    push: (group, asset, layers) => {
        const group_ = Array.isArray(group) ? group : [group];
        for (const group of group_) {
            if (groups) {
                runFullMask({ group, asset, layers });
            } else {
                wkList.push({ group, asset, layers });
            }
        }
    },
};

export default function () {
    AssetManager.afterLoad(() => {
        groups = AssetGroup.map((g) => g.Name);
        wkList.forEach(runFullMask);
    });
}
