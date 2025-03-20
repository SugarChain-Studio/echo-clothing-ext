import { HookManager } from "@sugarch/bc-mod-hook-manager";

/** @type {Partial<Record<CustomGroupName,Set<string> | "any">>} */
const speakingAssets = {
    ItemMisc: new Set(["TeddyBear", "PetPotato", "BunPlush", "FoxPlush", "Karl"]),
    ItemHandheld: new Set(["Shark", "伊偶_Luzi", "Smartphone", "Phone1", "Phone2"]),
};

/** @type {Partial<Record<CustomGroupName,Set<string> | "any">>} */
const hearingAssets = {
    ItemEars: "any",
};

/**
 * @param {Partial<Record<CustomGroupName,Set<string> | "any">>} vAssets
 * @returns {string | undefined}
 */
function validItemCraftingDesc(vAssets) {
    for (const [groupName, assets] of Object.entries(vAssets)) {
        const item = InventoryGet(Player, /** @type{any}*/ (groupName));
        if (item && (assets === "any" || assets.has(item.Asset.Name))) {
            const m = item.Craft?.Description?.match(/["“](.+)["”]/);
            if (m) return m[1];
        }
    }
    return undefined;
}

/**
 * @param {string} sourceText
 * @param {string} targetLang
 * @returns {Promise<{ translatedText: string }>}
 */
function translateText(sourceText, targetLang) {
    return new Promise(async (resolve) => {
        const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURI(
                sourceText
            )}`
        );
        const data = await response.json();
        const [translatedText, retSourceText] = data[0][0];
        const retSourceLang = data[2];
        if (retSourceLang === targetLang || translatedText === sourceText || retSourceText !== sourceText) return;
        resolve({ translatedText });
    });
}

export default function () {
    HookManager.progressiveHook("ChatRoomMessageDisplay").inject((args) => {
        const data = args[0];
        if (["Chat", "Whisper", "Emote"].includes(data.Type)) {
            if (Array.isArray(data.Dictionary) && data.Dictionary.find((d) => d["AutoTranslated"])) return;
            if (["\\", "/", "www"].some((s) => data.Content.includes(s))) return;
            const modedData = (prefix, text) => ({
                ...data,
                Content: `${prefix} ${text}`,
                Dictionary: /** @type {ChatMessageDictionary} */ ([{ Automatic: true }, { AutoTranslated: true }]),
            });

            if (data.Sender === Player.MemberNumber) {
                const tLang = validItemCraftingDesc(speakingAssets);
                if (tLang)
                    translateText(data.Content, tLang).then(({ translatedText }) =>
                        ServerSend("ChatRoomChat", modedData("🔊", translatedText))
                    );
            } else {
                const tLang = validItemCraftingDesc(hearingAssets);
                if (tLang)
                    translateText(data.Content, tLang).then(({ translatedText }) =>
                        ChatRoomMessage(modedData("📞", translatedText))
                    );
            }
        }
    });
}
