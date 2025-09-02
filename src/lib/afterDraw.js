/**
 * @template {object} PreDataType
 * @template {ExtendedItemData<any>} DataType
 * @template {Record<string, any>} PersistentData
 */
class AfterDrawProcess {
    /**
     * @param {(drawData: DynamicDrawingData<PersistentData> ) => PreDataType} pre
     */
    constructor(pre) {
        this.pre = pre;
        this.drawProcess = {};
    }

    /** @type {ExtendedItemScriptHookCallbacks.AfterDraw<DataType, PersistentData>} */
    afterDraw(data, originalFunction, drawData) {
        const preData = this.pre ? this.pre(drawData) : {};
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
 * @param {"modular"} mode
 * @param {PersistentData} sample 仅用于类型推导的参数
 * @param {(drawData: DynamicDrawingData<PersistentData> ) => PreDataType} pre
 * @returns {AfterDrawProcess<PreDataType, ModularItemData, PersistentData>}
 */
/**
 * @template {object} PreDataType
 * @template {Record<string, any>} PersistentData
 *
 * @overload
 * @param {"typed"} mode
 * @param {PersistentData} sample 仅用于类型推导的参数
 * @param {(drawData: DynamicDrawingData<PersistentData> ) => PreDataType} pre
 * @returns {AfterDrawProcess<PreDataType, TypedItemData, PersistentData>}
 */
/**
 * @template {object} PreDataType
 * @template {Record<string, any>} PersistentData
 *
 * @overload
 * @param {"noarch"} mode
 * @param {PersistentData} sample 仅用于类型推导的参数
 * @param {( drawData: DynamicDrawingData<PersistentData> ) => PreDataType} pre
 * @returns {AfterDrawProcess<PreDataType, NoArchItemData, PersistentData>}
 */
/**
 * @template {Record<string, any>} PersistentData
 * @template {object} PreDataType
 * @param {"modular" | "typed" | "noarch"} _1
 * @param {PersistentData} _2
 * @param {(drawData: DynamicDrawingData<PersistentData> ) => PreDataType} pre
 */
export function createAfterDrawProcess(_1, _2, pre) {
    return new AfterDrawProcess(pre);
}
