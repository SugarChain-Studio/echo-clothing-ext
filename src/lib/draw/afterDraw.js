/**
 * @template {any} PreDataType
 * @template {ExtendedItemData<any>} DataType
 * @template {Record<string, any>} PersistentData
 */
class AfterDrawProcess {
    /**
     * @typedef {[PreDataType] extends [undefined | void] ?
     *      (drawData: DynamicDrawingData<PersistentData>) => void :
     *      (drawData: DynamicDrawingData<PersistentData>, preData:PreDataType) => void} LayerHowFunction
     */

    /**
     * @param {(drawData: DynamicDrawingData<PersistentData>, data?: DataType ) => PreDataType} [pre] 用于在每次绘制前计算一些数据
     */
    constructor(pre) {
        this.pre = pre;
        /** @type {Record<string, LayerHowFunction>} */
        this.drawProcess = {};
    }

    /** @type {ExtendedItemScriptHookCallbacks.AfterDraw<DataType, PersistentData>} */
    afterDraw(data, originalFunction, drawData) {
        const preData = this.pre ? this.pre(drawData, data) : undefined;
        const { L } = drawData;
        if (L in this.drawProcess) {
            this.drawProcess[L](drawData, preData);
        }
    }

    /** @type {ExtendedItemCallbacks.AfterDraw<PersistentData>} */
    basicAfterDraw(drawData) {
        const preData = this.pre ? this.pre(drawData) : undefined;
        const { L } = drawData;
        if (L in this.drawProcess) {
            this.drawProcess[L](drawData, preData);
        }
    }

    /**
     * @param {string | string[]} layer
     * @param {LayerHowFunction} how
     * @returns {typeof this}
     */
    onLayer(layer, how) {
        const layers = Array.isArray(layer) ? layer : [layer];
        layers.forEach((layer) => {
            this.drawProcess[layer] = how;
        });
        return this;
    }

    /**
     * @param {Record<string, LayerHowFunction>} layers
     */
    onLayers(layers) {
        for (const [layer, how] of Object.entries(layers)) {
            this.drawProcess[layer] = how;
        }
        return this;
    }

    /**
     * @returns {{AfterDraw: ExtendedItemScriptHookCallbacks.AfterDraw<DataType, PersistentData>}}
     */
    hooks() {
        return { AfterDraw: (...args) => this.afterDraw(...args) };
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
 * @template {Record<string, any>} PersistentData
 *
 * @overload
 * @param {"modular"} mode
 * @param {PersistentData} sample 仅用于类型推导的参数
 * @returns {AfterDrawProcess<void, ModularItemData, PersistentData>}
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
 * @template {Record<string, any>} PersistentData
 *
 * @overload
 * @param {"noarch"} mode
 * @param {PersistentData} sample 仅用于类型推导的参数
 * @returns {AfterDrawProcess<void, NoArchItemData, PersistentData>}
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
