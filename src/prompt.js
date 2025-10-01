/**
 * @typedef {Object} ButtonDefinition
 * @property {string} text
 * @property {()=>void} [callback]
 */

/**
 * @typedef {Object} PromptOption
 * @property {string} title
 * @property {string} message
 * @property {ButtonDefinition} [confirm]
 * @property {ButtonDefinition} [cancel]
 * @property {ButtonDefinition} [deny]
 */

/** @type {Translation.CustomRecord<"Confirm" | "Cancel" | "Deny", string>} */
const confirm = {
    CN: {
        Confirm: "确定",
        Cancel: "取消",
        Deny: "拒绝",
    },
    EN: {
        Confirm: "Confirm",
        Cancel: "Cancel",
        Deny: "Deny",
    },
};

/**
 * @param {Translation.Dialog} entry
 * @param {string} tag
 * @return {string}
 */
function resolve(entry, tag) {
    /** @type {ServerChatRoomLanguage}*/
    const lang = TranslationLanguage === "TW" ? "CN" : TranslationLanguage;
    return entry[lang]?.[tag] || entry["EN"]?.[tag] || tag;
}

// 缓存SweetAlert2实例
let SweetAlert = null;

/**
 * 加载SweetAlert2库
 * @returns {Promise<import("sweetalert2").default>} SweetAlert2实例
 */
async function loadSweetAlert() {
    // 如果已经加载过，直接返回缓存的实例
    if (SweetAlert) return SweetAlert;

    try {
        // 首先检查全局对象上是否已有SweetAlert2
        if (globalThis.Swal) {
            SweetAlert = globalThis.Swal;
        } else {
            // 否则动态加载库
            const module = await import("https://cdn.jsdelivr.net/npm/sweetalert2@11.23.0/+esm");
            SweetAlert = module.default;
        }
        return SweetAlert;
    } catch (error) {
        console.error("Failed to load SweetAlert2:", error);
        // 提供一个简单的备用提示方式
        return {
            // @ts-ignore
            fire: ({ title, html }) => {
                alert(`${title}\n\n${html?.replace(/<[^>]*>/g, "") || ""}`);
                return Promise.resolve({ isConfirmed: false, isDenied: false, isDismissed: true });
            },
        };
    }
}

/**
 * 显示提示对话框
 * @param {PromptOption} option - 提示选项
 * @returns {Promise<void>}
 */
export async function showPrompt(option) {
    const Swal = await loadSweetAlert();

    return Swal.fire({
        title: option.title,
        html: option.message,
        confirmButtonText: option.confirm?.text || resolve(confirm, "Confirm"),

        showCancelButton: !!option.cancel,
        cancelButtonText: option.cancel?.text || resolve(confirm, "Cancel"),

        showDenyButton: !!option.deny,
        denyButtonText: option.deny?.text || resolve(confirm, "Deny"),
    }).then((result) => {
        if (result.isConfirmed) {
            option.confirm?.callback && option.confirm.callback();
        } else if (result.isDenied) {
            option.deny?.callback && option.deny.callback();
        } else if (result.isDismissed) {
            option.cancel?.callback && option.cancel.callback();
        }
    });
}
