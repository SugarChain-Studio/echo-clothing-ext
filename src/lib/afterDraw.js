import { Logger } from "@mod-utils/log";

/**
 * @template {object} PreDataType
 * @template {ExtendedItemData<any>} DataType
 * @template {Record<string, any>} PersistentData
 */
class AfterDrawProcess {
    /**
     * @param {(drawData: DynamicDrawingData<PersistentData>, data?: DataType ) => PreDataType} [pre] 用于在每次绘制前计算一些数据
     */
    constructor(pre) {
        this.pre = pre;
        this.drawProcess = {};
    }

    /** @type {ExtendedItemScriptHookCallbacks.AfterDraw<DataType, PersistentData>} */
    afterDraw(data, originalFunction, drawData) {
        const preData = this.pre ? this.pre(drawData, data) : {};
        const { L } = drawData;
        if (L in this.drawProcess) {
            this.drawProcess[L](preData, drawData);
        }
    }

    /** @type {ExtendedItemCallbacks.AfterDraw<PersistentData>} */
    basicAfterDraw(drawData) {
        const preData = this.pre ? this.pre(drawData) : {};
        const { L } = drawData;
        if (L in this.drawProcess) {
            this.drawProcess[L](preData, drawData);
        }
    }

    /**
     * @param {string | string[]} layer
     * @param {(preData:PreDataType, drawData: DynamicDrawingData<PersistentData>) => void} how
     */
    onLayer(layer, how) {
        const layers = Array.isArray(layer) ? layer : [layer];
        layers.forEach((layer) => {
            this.drawProcess[layer] = how;
        });
        return this;
    }

    /**
     * @param {Record<string, Parameters<AfterDrawProcess["onLayer"]>[1]> } layers
     */
    onLayers(layers) {
        for (const [layer, how] of Object.entries(layers)) {
            this.drawProcess[layer] = how;
        }
        return this;
    }
}
/**
 * @template {object} PreDataType
 * @template {Record<string, any>} PersistentData
 *
 * @overload
 * @param {"text"} mode
 * @param {PersistentData} sample 仅用于类型推导的参数
 * @param {(drawData: DynamicDrawingData<PersistentData>, data?: TextItemData ) => PreDataType} [pre]
 * @returns {AfterDrawProcess<PreDataType, TextItemData, PersistentData>}
 */
/**
 * @template {object} PreDataType
 * @template {Record<string, any>} PersistentData
 *
 * @overload
 * @param {"modular"} mode
 * @param {PersistentData} sample 仅用于类型推导的参数
 * @param {(drawData: DynamicDrawingData<PersistentData>, data?: ModularItemData ) => PreDataType} [pre]
 * @returns {AfterDrawProcess<PreDataType, ModularItemData, PersistentData>}
 */
/**
 * @template {object} PreDataType
 * @template {Record<string, any>} PersistentData
 *
 * @overload
 * @param {"typed"} mode
 * @param {PersistentData} sample 仅用于类型推导的参数
 * @param {(drawData: DynamicDrawingData<PersistentData>, data?: TypedItemData ) => PreDataType} [pre]
 * @returns {AfterDrawProcess<PreDataType, TypedItemData, PersistentData>}
 */
/**
 * @template {object} PreDataType
 * @template {Record<string, any>} PersistentData
 *
 * @overload
 * @param {"noarch"} mode
 * @param {PersistentData} sample 仅用于类型推导的参数
 * @param {( drawData: DynamicDrawingData<PersistentData>, data?: NoArchItemData  ) => PreDataType} [pre]
 * @returns {AfterDrawProcess<PreDataType, NoArchItemData, PersistentData>}
 */
/**
 * @template {Record<string, any>} PersistentData
 * @template {object} PreDataType
 * @param {"modular" | "typed" | "noarch" | "text"} _1
 * @param {PersistentData} _2
 * @param {(drawData: DynamicDrawingData<PersistentData>, data?: any  ) => PreDataType} [pre]
 */
export function createAfterDrawProcess(_1, _2, pre) {
    return new AfterDrawProcess(pre);
}

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
            if (globalThis[`Assets${g}${asset.Name}${map[key]}`]) {
                Logger.warn(`Overriding existing hook: "Assets${g}${asset.Name}${map[key]}"`);
            }
            globalThis[`Assets${g}${asset.Name}${map[key]}`] = func;
        }
    }
}
