import { Typing } from "./typing";

/**
 * 为物品生成 左/右/两侧 的外观选项
 * @param {CustomAssetDefinition} assetDef
 * @param {object} [config]
 * @param {"left" | "right" | "both"} [config.preset] 物品的默认外观
 * @param {boolean} [config.mirror] 是否镜像
 */
function createLeftRightBoth(assetDef, { preset = "left", mirror = false } = {}) {
    const { Options, leftConfig, rightConfig } = (() => {
        const config1 = { typed: [0, 1] };
        const config2 = { typed: [0, 2] };
        const config3 = { typed: [1, 2] };
        if (preset === "left") {
            return {
                Options: [{ Name: "left" }, { Name: "right" }, { Name: "both" }],
                leftConfig: mirror ? config3 : config2,
                rightConfig: mirror ? config2 : config3,
            };
        } else if (preset === "right") {
            return {
                Options: [{ Name: "right" }, { Name: "left" }, { Name: "both" }],
                leftConfig: mirror ? config2 : config3,
                rightConfig: mirror ? config3 : config2,
            };
        }
        return {
            Options: [{ Name: "both" }, { Name: "left" }, { Name: "right" }],
            leftConfig: mirror ? config2 : config1,
            rightConfig: mirror ? config1 : config2,
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

export class ExtendedTools {
    static createLeftRightBoth = createLeftRightBoth;

    /**
     * @overload
     * @param {AddAssetWithConfigParamsNoGroup} arg0
     * @param {Parameters<typeof createLeftRightBoth>[1]} [arg1]
     * @returns {AddAssetWithConfigParamsNoGroup}
     */
    /**
     * @overload
     * @param {AddAssetWithConfigParams} arg0
     * @param {Parameters<typeof createLeftRightBoth>[1]} [arg1]
     * @returns {AddAssetWithConfigParams}
     */
    /**
     * @param { AddAssetWithConfigParams | AddAssetWithConfigParamsNoGroup} arg0
     * @param {Parameters<typeof createLeftRightBoth>[1]} [arg1]
     */
    static createLRBConfig(arg0, arg1 = { preset: "left", mirror: false }) {
        if (Typing.addAssetParamHasGroup(arg0)) {
            return /** @type {AddAssetWithConfigParams} */ ([
                arg0[0],
                arg0[1],
                { ...arg0[2], ...createLeftRightBoth(arg0[1], arg1) },
            ]);
        } else {
            return /** @type {AddAssetWithConfigParamsNoGroup} */ ([
                arg0[0],
                { ...arg0[1], ...createLeftRightBoth(arg0[0], arg1) },
            ]);
        }
    }
}
