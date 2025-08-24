import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { AssetManager } from "../assetForward";
import { showPrompt } from "../prompt";
import { i18n } from "../i18n";

const dataKey = "EchoClothingCache";

/** @type {Record<string, Translation.Entry>} */
const messages = {
    title: {
        CN: "服装拓展 - 制作物品数据恢复",
        EN: "Echo Clothing - Crafting Data Recovery",
    },
    detectionHeader: {
        CN: "<h3>检测到制作物品数据差异</h3>",
        EN: "<h3>Crafting Data Differences Detected</h3>",
    },
    missingItems: {
        CN: "<p>备份中有{0}件制作物品，当前数据中缺少{1}件物品。</p>",
        EN: "<p>Backup contains {0} crafting items, {1} items are missing in current data.</p>",
    },
    missingItemsList: {
        CN: "<p><b>缺少的物品:</b> {0}</p>",
        EN: "<p><b>Missing items:</b> {0}</p>",
    },
    chooseAction: {
        CN: "<p>请选择恢复操作:</p>",
        EN: "<p>Please choose recovery action:</p>",
    },
    restoreMissing: {
        CN: "恢复缺少的物品",
        EN: "Restore Missing Items",
    },
    keepCurrent: {
        CN: "保留当前数据",
        EN: "Keep Current Data",
    },
    noAction: {
        CN: "无操作",
        EN: "No Action",
    },
    noItems: {
        CN: "无",
        EN: "None",
    },
    unnamedItem: {
        CN: "未命名物品",
        EN: "Unnamed Item",
    },
    moreItems: {
        CN: "...等{0}件物品",
        EN: "...and {0} more items",
    },
};

/**
 * @param {CraftingItem} craftItem
 */
function isModCraftItem(craftItem) {
    return AssetManager.assetNameIsStrictCustomed(craftItem.Item);
}

/**
 * @typedef {Object} BackupData
 * @property {CraftingBackupData} crafting
 */

/**
 * @typedef {Object} CraftingBackupData
 * @property {number} time
 * @property {string} lzdata
 */

/**
 * @typedef {Object} UnCompressedCraftingBackupDataItem
 * @property {number} index
 * @property {CraftingItem} craft
 */

/**
 * @typedef {UnCompressedCraftingBackupDataItem[]} UnCompressedCraftingBackupData
 */

/** @type {import("@sugarch/bc-asset-manager").ILogger|null} */
let _Logger = null;

/**
 * 根据当前游戏语言获取消息
 * @param {string} key - 消息键值
 * @param {...string} args - 格式化参数
 * @returns {string} - 本地化后的消息
 */
const getMessage = (key, ...args) => i18n(messages, key, ...args);

/**
 * 获取当前玩家所有模组制作物品
 * @returns {UnCompressedCraftingBackupData} - 未压缩的制作备份数据
 */
function getCurrentModCraftItems() {
    if (!Player.Crafting) return [];

    const modItems = [];
    Player.Crafting.forEach((craft, index) => {
        if (craft && isModCraftItem(craft)) {
            modItems.push({
                index,
                craft: JSON.parse(JSON.stringify(craft)), // 深拷贝
            });
        }
    });

    return modItems;
}

/**
 * 保存当前模组制作物品数据到设置中
 */
function saveCurrentCraftingToSettings() {
    const modItems = getCurrentModCraftItems();

    // 确保设置对象存在
    if (!Player.ExtensionSettings) Player.ExtensionSettings = {};
    if (!Player.ExtensionSettings[dataKey]) Player.ExtensionSettings[dataKey] = {};

    // 存储数据
    const lzdata = JSON.stringify(modItems);
    Player.ExtensionSettings[dataKey].crafting = {
        time: Date.now(),
        lzdata,
    };

    // 保存到服务器
    ServerPlayerExtensionSettingsSync(dataKey);
    _Logger?.info("Crafting data saved to extension settings.");
}

/**
 * 只恢复缺少的制作物品数据
 * @param {UnCompressedCraftingBackupDataItem[]} missingItems - 缺少的物品数据
 */
function restoreMissingItems(missingItems) {
    if (!Player.Crafting) Player.Crafting = [];

    // Crafting数组最大长度限制，如果超过则扩展
    const MAX_CRAFTING_LENGTH = Player.Crafting.length <= 80 ? 80 : 160;

    // 只添加缺少的物品
    missingItems.forEach((item) => {
        // 限制索引范围
        if (item.index < MAX_CRAFTING_LENGTH) {
            Player.Crafting[item.index] = item.craft;
        }
    });

    // 通知服务器更新
    HookManager.invokeOriginal("CraftingSaveServer");

    // 数据已变更，更新备份
    saveCurrentCraftingToSettings();

    _Logger?.info(`Restored ${missingItems.length} missing crafting items.`);
}

/**
 * 比较两个制作物品是否相同
 * @param {CraftingItem} item1 - 物品1
 * @param {CraftingItem} item2 - 物品2
 * @returns {boolean} - 物品是否相同
 */
function compareCraftingItem(item1, item2) {
    // 检查物品是否存在
    if (!item1 || !item2) return item1 === item2;

    // 检查关键字段是否相同
    return (
        item1.Item === item2.Item &&
        item1.Name === item2.Name &&
        item1.Description === item2.Description &&
        item1.Lock === item2.Lock &&
        item1.Private === item2.Private
    );
}

/**
 * 比较当前制作物品数据和备份数据
 * @param {UnCompressedCraftingBackupData} backupData - 备份的数据
 * @returns {{
 *   identical: boolean,
 *   missingInCurrent: UnCompressedCraftingBackupDataItem[],
 *   differentInCurrent: UnCompressedCraftingBackupDataItem[]
 * }}
 */
function analyzeCraftingDifferences(backupData) {
    const currentModItems = getCurrentModCraftItems();

    // 为了查找方便，创建索引映射
    const currentMap = new Map();
    currentModItems.forEach((item) => {
        currentMap.set(item.index, item);
    });

    // 找出在备份中有但当前没有的物品
    const missingInCurrent = backupData.filter((backupItem) => {
        const currentItem = currentMap.get(backupItem.index);
        return !currentItem;
    });

    // 找出在两边都有但内容不同的物品
    const differentInCurrent = backupData.filter((backupItem) => {
        const currentItem = currentMap.get(backupItem.index);
        if (!currentItem) return false;

        return !compareCraftingItem(backupItem.craft, currentItem.craft);
    });

    return {
        identical: missingInCurrent.length === 0 && differentInCurrent.length === 0,
        missingInCurrent,
        differentInCurrent,
    };
}

/**
 * 生成制作物品列表的内联格式字符串
 * @param {UnCompressedCraftingBackupDataItem[]} items - 物品列表
 * @returns {string} - 格式化的字符串
 */
function formatItemsList(items) {
    if (items.length === 0) return getMessage("noItems");

    // 提取物品名称
    const itemNames = items.map((item) => item.craft.Name || getMessage("unnamedItem"));

    // 最多显示5个物品，超出部分显示省略号
    if (itemNames.length > 5) {
        return `${itemNames.slice(0, 5).join(", ")} ${getMessage("moreItems", items.length.toString())}`;
    }

    return itemNames.join(", ");
}

/**
 * 构建恢复提示消息
 * @param {UnCompressedCraftingBackupData} backupData - 备份数据
 * @param {number} totalMissing - 缺少的物品数量
 * @param {string} missingList - 格式化的缺少物品列表
 * @returns {string} - HTML格式的消息
 */
function buildRecoveryMessage(backupData, totalMissing, missingList) {
    return (
        getMessage("detectionHeader") +
        getMessage("missingItems", backupData.length.toString(), totalMissing.toString()) +
        getMessage("missingItemsList", missingList) +
        getMessage("chooseAction")
    );
}

function setup() {
    HookManager.afterPlayerLogin(() => {
        // 等待游戏加载完成
        setTimeout(() => {
            // 获取备份数据
            const backup = /** @type {BackupData|undefined} */ (Player.ExtensionSettings?.[dataKey]);

            if (backup?.crafting?.lzdata) {
                try {
                    /** @type {UnCompressedCraftingBackupData} */
                    const backupData = JSON.parse(backup.crafting.lzdata);

                    // 分析差异
                    const analysis = analyzeCraftingDifferences(backupData);

                    // 如果完全相同，无需操作
                    if (analysis.identical) {
                        _Logger?.info("Crafting backup is identical to current data, no action needed.");
                        return;
                    }

                    // 只在有缺少物品的情况下弹窗提示
                    if (analysis.missingInCurrent.length > 0) {
                        const totalMissing = analysis.missingInCurrent.length;
                        const missingList = formatItemsList(analysis.missingInCurrent);

                        const message = buildRecoveryMessage(backupData, totalMissing, missingList);

                        showPrompt({
                            title: getMessage("title"),
                            message,
                            confirm: {
                                text: getMessage("restoreMissing"),
                                callback: () => restoreMissingItems(analysis.missingInCurrent),
                            },
                            deny: {
                                text: getMessage("keepCurrent"),
                                callback: () => saveCurrentCraftingToSettings(),
                            },
                            cancel: {
                                text: getMessage("noAction"),
                            },
                        });
                    } else if (analysis.differentInCurrent.length > 0) {
                        // 如果没有缺少的物品，但有不同的物品，直接更新备份
                        _Logger?.info(`Found ${analysis.differentInCurrent.length} different items, updating backup`);
                        saveCurrentCraftingToSettings();
                    }
                } catch (e) {
                    _Logger?.error(`Failed to parse backup crafting data: ${e?.message}`);
                }
            } else {
                // 没有备份数据，保存当前数据
                saveCurrentCraftingToSettings();
            }
        }, 2000); // 等待2秒，确保数据已加载
    });

    HookManager.hookFunction("CraftingSaveServer", 0, (args, next) => {
        // 保存当前制作物品数据到设置
        saveCurrentCraftingToSettings();
        return next(args);
    });
}

export class CraftingCache {
    /**
     * @param {import("@sugarch/bc-asset-manager").ILogger} logger
     */
    static setup(logger) {
        _Logger = logger;
        setup();
    }
}
