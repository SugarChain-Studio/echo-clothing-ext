/** @type {(arg:any)=>any} */
const identity = (arg) => arg;

/**
 * @template {string} K
 * @template V
 * @param {Record<K,V>} record
 */
function recordEntries(record) {
    return /** @type {Array<[K,V]>} */ (Object.entries(record));
}

/**
 * @typedef {AssetDefinitionBase["DrawOffset"][0]} DrawOffsetItem
 */

/**
 * @param {AddAssetWithConfigParams | AddAssetWithConfigParamsNoGroup} arg0
 * @returns {arg0 is AddAssetWithConfigParams}
 */
function addAssetParamHasGroup(arg0) {
    return arg0.length === 3;
}

/**
 *
 * @param  {...[string|string[], string]} args
 * @returns {Record<string,string>}
 */
function stringEntries(...args) {
    /** @type {Record<string,string>} */
    const ret = {};
    for (const [key, value] of args) {
        if (Array.isArray(key)) {
            for (const k of key) {
                ret[k] = value;
            }
        } else {
            ret[key] = value;
        }
    }
    return ret;
}

export const Typing = /** @type {const} */ ({
    attributes: /** @type {(arg:CustomAssetAttribute[]) => AssetAttribute[]}*/ (identity),
    groups: /** @type {(arg:CustomGroupName[]) => AssetGroupName[]}*/ (identity),
    drawOffset: /** @type {(arg:DrawOffsetItem) => DrawOffsetItem}*/ (identity),
    asset: /** @type {(arg:CustomAssetDefinition) => CustomAssetDefinition}*/ (identity),
    assetTranslation: /** @type {(arg:Translation.String) => Translation.String}*/ (identity),
    modularItem: /** @type {(arg:ModularItemConfig) => ModularItemConfig}*/ (identity),
    typedItem: /** @type {(arg:TypedItemConfig) => TypedItemConfig}*/ (identity),
    /**
     * @template {string} K
     * @template {any} V
     * @param {Record<K,V>} arg
     * @returns {Record<K,V>}
     */
    record: (arg) => identity(arg),
    /**
     * @template T
     * @template R
     * @param {T} obj
     * @param {(arg: T) => R} func
     * @returns {R}
     */
    transform: (obj, func) => func(obj),
    entries: recordEntries,
    addAssetParamHasGroup,
    stringEntries,
});
