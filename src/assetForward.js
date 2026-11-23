import { AssetManager as originalAssetManager } from "@sugarch/bc-asset-manager";

/** @type { MyAssetManager } */
const AssetManager = originalAssetManager.typeBodyGroupNames();

/**
 * ItemPropertiesValidate (Scripts/Item.js:374) 會將不存在於 PropertyData 中的屬性刪除
 * e.g. 自訂屬性，如尿袋的Auto
 * 接著 ExtendedItemInit 會將剛剛被刪除的屬性加回去，然後回傳 true
 * 使每次CharacterOnlineRefresh (Server.js "Invalid appearance update bundle received").
 * 而因為屬性未修改，如此造成了循環
 * 因此容易觸發rate limiting
 * 此處將任何自訂的屬性加入 PropertyData ，並未驗證
 * @todo 這只是個臨時的修復
 * @param {unknown} config
 * @param {WeakSet<object>} [seen]
 */
function registerCustomProperties(config, seen = new WeakSet()) {
    // @ts-ignore: bc-stubs@132.0.0 尚未 declare
    if (typeof PropertyData === "undefined" || typeof PropertyDataEntry === "undefined") return;
    if (!config || typeof config !== "object" || seen.has(config)) return;
    seen.add(config);
    for (const [key, value] of Object.entries(config)) {
        if ((key === "BaselineProperty" || key === "Property") && value && typeof value === "object") {
            for (const name of Object.keys(value)) {
                // @ts-ignore: bc-stubs@132.0.0 尚未 declare
                if (name in PropertyData) continue;
                // @ts-ignore: bc-stubs@132.0.0 尚未 declare
                PropertyData[name] = new PropertyDataEntry(name, undefined, {
                    validate: (/** @type {unknown} */ prop) => ({ status: "ok", value: prop }),
                    compare: (/** @type {unknown} */ a, /** @type {unknown} */ b) => CommonDeepEqual(a, b),
                });
            }
        } else {
            registerCustomProperties(value, seen);
        }
    }
}

const mgr = /** @type {any} */ (AssetManager);
const addAssetWithConfig = mgr.addAssetWithConfig;
mgr.addAssetWithConfig = function (/** @type {unknown[]} */ ...args) {
    registerCustomProperties(args);
    return addAssetWithConfig.apply(this, args);
};

export { AssetManager };
