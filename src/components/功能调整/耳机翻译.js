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

const iso639_1_codes = new Set(
    `
    aa ab ae af ak am an ar as av ay az
    ba be bg bh bi bm bn bo br bs
    ca ce ch co cr cs cu cv cy
    da de dv dz
    ee el en eo es et eu
    fa ff fi fj fo fr fy
    ga gd gl gn gu gv
    ha he hi ho hr ht hu hy hz
    ia id ie ig ii ik io is it iu
    ja jv
    ka kg ki kj kk kl km kn ko kr ks ku kv kw ky
    la lb lg li ln lo lt lu lv
    mg mh mi mk ml mn mr ms mt my
    na nb nd ne ng nl nn no nr nv ny
    oc oj om or os
    pa pi pl ps pt
    qu
    rm rn ro ru rw
    sa sc sd se sg sh si sk sl sm sn so sq sr ss st su sv sw
    ta te tg th ti tk tl tn to tr ts tt tw ty
    ug uk ur uz
    ve vi vo
    wa wo
    xh
    yi yo
    za zh zu
    `
        .trim()
        .split("\n")
        .map((x) => x.split(" "))
        .flat()
        .filter((x) => x.length > 0)
);

/**
 * @param {Partial<Record<CustomGroupName,Set<string> | "any">>} vAssets
 * @returns {string | undefined}
 */
function validItemCraftingDesc(vAssets) {
    for (const [groupName, assets] of Object.entries(vAssets)) {
        const item = InventoryGet(Player, /** @type{any}*/ (groupName));
        if (item && (assets === "any" || assets.has(item.Asset.Name))) {
            const m = item.Craft?.Description?.match(/\[(([a-z]{2})(?:-[A-Z]{1,3})?)\]/);
            if (m && iso639_1_codes.has(m[2].toLowerCase())) {
                return m[1];
            }
        }
    }
    return undefined;
}

/**
 * @param {string} sourceText
 * @param {string} targetLang
 * @returns {Promise<{ valid: boolean, translatedText: string }>}
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
        const valid = retSourceLang !== targetLang && retSourceText === sourceText && translatedText !== sourceText;
        resolve({ valid, translatedText });
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
                    translateText(data.Content, tLang).then(({ valid, translatedText }) => {
                        if (valid) ServerSend("ChatRoomChat", modedData("🔊", translatedText));
                    });
            } else {
                const tLang = validItemCraftingDesc(hearingAssets);
                if (tLang)
                    translateText(data.Content, tLang).then(({ valid, translatedText }) => {
                        if (valid) ChatRoomMessage(modedData("📞", translatedText));
                    });
            }
        }
    });
}
