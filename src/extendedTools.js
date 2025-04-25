/**
 * 为物品生成 左/右/两侧 的外观选项
 * @param {CustomAssetDefinition} assetDef
 */
function createLeftRightBoth(assetDef) {
    /** @type {AssetArchetypeConfig} */
    const extended = {
        Archetype: ExtendedArchetype.TYPED,
        DrawImages: false,
        Options: [{ Name: "左" }, { Name: "右" }, { Name: "两侧" }],
    };

    /** @type {Translation.String} */
    const assetStrings = {
        CN: {
            Select: "选择外观",
            左: "左",
            右: "右",
            两侧: "两侧",
        },
        EN: {
            Select: "Choose Appearance",
            左: "Left",
            右: "Right",
            两侧: "Both",
        },
        RU: {
            Select: "Выберите внешний вид",
            左: "Левый",
            右: "Правый",
            两侧: "Оба",
        },
    };

    for (const layer of assetDef.Layer) {
        if (layer.Name.includes("左")) {
            layer.AllowTypes = { typed: [0, 2] };
        } else if (layer.Name.includes("右")) {
            layer.AllowTypes = { typed: [1, 2] };
        }
    }

    return {
        extended,
        assetStrings,
    };
}

export const ExtendedTools = { createLeftRightBoth };
