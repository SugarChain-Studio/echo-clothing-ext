/**
 * 根据当前游戏语言获取消息
 * @param {Translation.Dialog} messages - 消息对象
 * @param {string} key - 消息键值
 * @param {...string} args - 格式化参数
 * @returns {string} - 本地化后的消息
 */
export function i18n(messages, key, ...args) {
    const lang = TranslationLanguage === "TW" ? "CN" : TranslationLanguage || "EN";
    let msg = messages[key][lang] || messages[key].EN;

    // 替换格式化参数
    args.forEach((arg, index) => {
        msg = msg.replace(`{${index}}`, arg);
    });

    return msg;
}
/**
 * 根据当前游戏语言获取消息
 * @param {Translation.Entry} entry - 消息对象
 * @param {...string} args - 格式化参数
 * @returns {string} - 本地化后的消息
 */
export function i18nEntry(entry, ...args) {
    const lang = TranslationLanguage === "TW" ? "CN" : TranslationLanguage || "EN";
    let msg = entry[lang] || entry.EN;

    // 替换格式化参数
    args.forEach((arg, index) => {
        msg = msg.replace(`{${index}}`, arg);
    });

    return msg;
}
