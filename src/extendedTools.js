/**
 * 为物品生成 左/右/两侧 的外观选项
 * @param {CustomAssetDefinition} assetDef
 * @param {"left" | "right" | "both"} preset 物品的默认外观
 */
function createLeftRightBoth(assetDef, preset = "left") {
    const { Options, leftConfig, rightConfig } = (() => {
        if (preset === "left") {
            return {
                Options: [{ Name: "left" }, { Name: "right" }, { Name: "both" }],
                leftConfig: { typed: [0, 2] },
                rightConfig: { typed: [1, 2] },
            };
        } else if (preset === "right") {
            return {
                Options: [{ Name: "right" }, { Name: "left" }, { Name: "both" }],
                leftConfig: { typed: [1, 2] },
                rightConfig: { typed: [0, 2] },
            };
        }
        return {
            Options: [{ Name: "both" }, { Name: "left" }, { Name: "right" }],
            leftConfig: { typed: [0, 1] },
            rightConfig: { typed: [0, 2] },
        };
    })();

    /** @type {AssetArchetypeConfig} */
    const extended = {
        Archetype: ExtendedArchetype.TYPED,
        DrawImages: false,
        Options,
    };

    /** @type {Translation.String} */
    const assetStrings = {
        CN: {
            Select: "选择外观",
            left: "左",
            right: "右",
            both: "两侧",
        },
        EN: {
            Select: "Choose Appearance",
            left: "Left",
            right: "Right",
            both: "Both",
        },
        RU: {
            Select: "Выберите внешний вид",
            left: "Левый",
            right: "Правый",
            both: "Оба",
        },
    };

    for (const layer of assetDef.Layer) {
        if (layer.Name.includes("左")) {
            layer.AllowTypes = leftConfig;
        } else if (layer.Name.includes("右")) {
            layer.AllowTypes = rightConfig;
        }
    }

    return {
        extended,
        assetStrings,
    };
}

export const ExtendedTools = { createLeftRightBoth };
