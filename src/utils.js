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

/**
 * 将自定义物品属性转换为AssetAttribute数组。
 * @param {CustomAssetAttribute[]} attrs
 * @returns {AssetAttribute[]}
 */
function attributes(attrs) {
    return /** @type {AssetAttribute[]} */ (attrs);
}

export const Typing = {
    attributes,
};
