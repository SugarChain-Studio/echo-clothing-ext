/**
 * @template T
 * @typedef {(arg0:T) => T} Identity
 */

/** @type {(arg:any)=>any} */
const identity = (arg) => arg;

/**
 * @template T
 * @template U
 * @typedef { (arg0:T, arg1?:Partial<U>) => U } MergeFunction
 */

/** @type {MergeFunction<any,any>} */
const merge = (arg0, arg1) => ({ ...arg0, ...arg1 });

/**
 * @param {...Object} args
 * @returns {Object}
 */
const mergeAll = (...args) => args.reduce((acc, arg) => ({ ...acc, ...arg }), {});

/**
 * @typedef {AssetDefinitionBase["DrawOffset"][0]} DrawOffsetItem
 */

/**
 *
 * @param {AddAssetWithConfigParams[0] | undefined} g0
 * @param {AddAssetWithConfigParams[0] | undefined} g1
 * @return {AddAssetWithConfigParams[0]}
 */
function mergeGroup(g0, g1) {
    /** @type {AddAssetWithConfigParams[0]} */
    const ret = [];
    /** @type {(group: AddAssetWithConfigParams[0] | undefined) => void} */
    const push = (group) => {
        if (Array.isArray(group)) {
            ret.push(...group);
        } else {
            ret.push(group);
        }
    };

    if (g0) push(g0);
    if (g1) push(g1);
    return ret;
}

/**
 * @param {AddAssetWithConfigParams} arg0
 * @param {[AddAssetWithConfigParams[0],Partial<AddAssetWithConfigParams[1]>,Partial<AddAssetWithConfigParams[2]>][]} arg1
 * @returns {AddAssetWithConfigParams[]}
 */
function mergeAddAssetParams(arg0, arg1) {
    return arg1.map((arg) => [
        mergeGroup(arg0[0], arg[0]),
        /** @type {CustomAssetDefinition}*/ ({ ...arg0[1], ...arg[1] }),
        { ...arg0[2], ...arg[2] },
    ]);
}

/**
 * @template K
 * @param  {...[ string| string[], K]} args
 * @returns {Record<string,K>}
 */
function repeatEntries(...args) {
    /** @type {Record<string,K>} */
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

/**
 * @template T
 * @template R
 * @typedef {(arg:T[], func:(arg:T)=>R)=>R[]} ArrayTransformFunction
 */

class _Type {
    /** @type {(arg:CustomAssetAttribute[]) => AssetAttribute[]}*/
    attributes = identity;
    /** @type {(arg:CustomGroupName[]) => AssetGroupName[]}*/
    groups = identity;
    /** @type {(arg:ActivityName[]) => ActivityName[]} */
    activities = identity;
    /** @type {Identity<DrawOffsetItem>}*/
    drawOffset = identity;
    /** @type {Identity<CustomAssetDefinition>}*/
    asset = identity;
    /** @type {Identity<Translation.String>}*/
    assetTranslation = identity;
    /** @type {Identity<ModularItemConfig>}*/
    modularItem = identity;
    /** @type {Identity<TypedItemConfig>}*/
    typedItem = identity;
    /**
     * @template {string} K
     * @template {any} V
     * @param {Record<K,V>} arg
     * @returns {Record<K,V>}
     */
    record = (arg) => identity(arg);
    /**
     * @template T
     * @template R
     * @param {T} obj
     * @param {(arg: T) => R} func
     * @returns {R}
     */
    transform = (obj, func) => func(obj);
}

export const Type = new _Type();

class _Access {
    /**
     * 获取Record中特定key的值，如果没有则返回undefined
     * @template {string} K
     * @template {any} V
     * @overload
     * @param {Record<K, V>} obj
     * @param {string} key
     * @returns {V | undefined}
     */
    /**
     * 获取Object中特定key的值，如果没有则返回undefined
     * @template {object} R
     * @template {string | number} K
     * @overload
     * @param {R} obj
     * @param {K} key
     * @returns {any}
     */
    /**
     * @template {object} R
     * @template {string | number} K
     * @param {R} obj
     * @param {K} key
     * @returns {any}
     */
    get(obj, key) {
        return /** @type {any}*/ (obj)?.[key];
    }

    /**
     * 取得Record中特定key的值，如果没有则返回默认值
     * @template {object} R
     * @template {string | number} K
     * @template {any} V
     * @param {R} obj
     * @param {K} key
     * @param {V} defaultValue
     * @returns {V}
     */
    getOr(obj, key, defaultValue) {
        return /** @type {any}*/ (obj)?.[key] ?? defaultValue;
    }

    /**
     * 设置对象属性的值，并返回该值。
     * @template {object} R
     * @template {string | number} K
     * @template {any} V
     * @param {R} obj
     * @param {K} key
     * @param {V} value
     */
    set(obj, key, value) {
        /** @type {any}*/ (obj)[key] = value;
        return /** @type {any}*/ (obj)[key];
    }

    /**
     * @template {string} K
     * @template {any} V
     * @param {Record<K,V>} obj
     * @returns {[K,V][]}
     */
    entries(obj) {
        return /** @type {[K,V][]}*/ (Object.entries(obj));
    }
}

export const Access = new _Access();

class _Merge {
    /** @type {MergeFunction<CustomAssetDefinitionBase, CustomAssetDefinitionItem>}*/
    item = merge;
    /** @type {MergeFunction<CustomAssetDefinitionBase, CustomAssetDefinitionAppearance>}*/
    app = merge;
    asset = /** @type {(...args: Partial<CustomAssetDefinition>[]) => CustomAssetDefinition}*/ (mergeAll);
    addAssetParams = mergeAddAssetParams;
    repeatEntries = repeatEntries;

    /**
     * @param {Record<string, string>[]} args
     */
    stringRecords = (...args) => {
        /** @type {Record<string, any>} */
        const ret = {};
        for (const arg of args) {
            Object.assign(ret, arg);
        }
        return ret;
    };
}

export const Merge = new _Merge();

class _Layer {
    /** @type {ArrayTransformFunction<AssetLayerDefinition, AssetLayerDefinition>} */
    map = (args, func) => args.map(func);
    /** @type {Identity<AssetLayerDefinition>} */
    screen = (layer) => ({ ...layer, BlendingMode: "screen", AllowColorize: false });
    /** @type {Identity<AssetLayerDefinition>} */
    multiply = (layer) => ({ ...layer, BlendingMode: "multiply", AllowColorize: false });
}

export const Layer = new _Layer();
