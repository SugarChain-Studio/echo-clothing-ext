/**
 * 从已有的物品定义中获取图层名称，组成字典。ColorGroup也会提取。类似 _1 和 _Luzi 这样的后缀会被清理。
 * @param {CustomAssetDefinition} assetDef
 * @return {Record<string,string>}
 */
export function takeLayerNames(assetDef) {
    /** @type {Record<string,string>} */
    const ret = {};
    assetDef.Layer?.filter((l) => (l.AllowColorize ?? true) && !l.CopyLayerColor && !l.HideColoring).forEach(
        ({ Name, ColorGroup }) => {
            ret[Name] = Name.replace(/(_\d+|_\w+)$/, "");
            if (ColorGroup) ret[ColorGroup] = ColorGroup.replace(/(_\d+|_\w+)$/, "");
        }
    );
    return ret;
}

/** @type {(arg:any)=>any} */
const identity = (arg) => arg;

/**
 * @typedef {AssetDefinitionBase["DrawOffset"][0]} DrawOffsetItem
 */

export const Typing = {
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
};
