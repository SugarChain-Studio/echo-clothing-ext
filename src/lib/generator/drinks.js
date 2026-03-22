/**
 * @typedef {"可乐" | "橙汁" | "牛奶" | "空杯"} DrinkType
 */

import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { AssetManager } from "../../assetForward";

const drinkList = /** @type {const} */ (["可乐", "橙汁", "牛奶", "空杯"]);

/**
 * @typedef {Object} AssetIdentifier
 * @property {string} Group
 * @property {string} Name
 */

/** @type {string[]} */
const registeredAssets = [];

/**
 * 注册饮料图层
 * @param {AssetIdentifier} assetId 注册的物品，用于加载图片后刷新显示
 * @param {(type:DrinkType)=>string} layerName 图层名称生成函数，参数为饮料类型，用于注册图片映射
 */
export function registerDrinkLayers(assetId, layerName) {
    const mappings = drinkList.reduce((acc, curr) => {
        acc[layerName(curr)] = `Icons/Luzi_GlassDrink_${curr}.png`;
        return acc;
    }, /** @type {Record<string, string>} */ ({}));
    AssetManager.addImageMapping(mappings);
    registeredAssets.push(`${assetId.Group}::${assetId.Name}`);
}

HookManager.hookFunction("DrawRefreshCharacterForImage", 0, (args, next) => {
    const ret = next(args);
    const [URL] = args;
    if (URL && URL.src && URL.src.includes("Icons/Luzi_GlassDrink_")) {
        Character.filter((c) =>
            c.Appearance.some((app) => registeredAssets.includes(`${app.Asset.Group.Name}::${app.Asset.Name}`))
        ).forEach((c) => (c.MustDraw = true));
    }
    return ret;
});
