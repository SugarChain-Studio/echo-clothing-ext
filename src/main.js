import { AssetManager } from "./assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { ModInfo, resourceBaseURL } from "@mod-utils/rollupHelper";

import { setup } from "./components";
import { once } from "@sugarch/bc-mod-utility";
import { CharacterTag } from "@mod-utils/charaTag";
import { Logger } from "@mod-utils/log";
import { CraftingCache } from "./craftingCache";
import { fetchAssetOverrides } from "@mod-utils/fetchAssetOverrides";
import { resolveAssetOverrides } from "@sugarch/bc-asset-manager";

const message = {
    en: "Initiating custom assets registration after player appearance loaded, some assets may be lost.",
    zh: "在玩家外观加载后初始化自定义资产注册，部分资产可能丢失。",
};

function wearHamburgerOnThankYou() {
    HookManager.progressiveHook("LoginDoNextThankYou")
        .next()
        .inject((args, next) => {
            if (CurrentScreen !== "Login") return next(args);
            const hood = LoginCharacter.Appearance.find((a) => a.Asset.Group.Name === "ItemHood");
            if (!hood || hood.Asset.Name !== "汉堡_Luzi") {
                InventoryWear(LoginCharacter, "汉堡_Luzi", "ItemHood");
                CharacterRefresh(LoginCharacter);
            }
        });
}

once(ModInfo.name, async () => {
    HookManager.setLogger(Logger);
    AssetManager.setLogger(Logger);

    CraftingCache.setup(Logger);

    const bcModSdk = await (async () => {
        if (globalThis.bcModSdk) {
            return globalThis.bcModSdk;
        } else {
            const module = await import("https://cdn.jsdelivr.net/npm/bondage-club-mod-sdk@1.2.0/dist/bcmodsdk.js");
            return module.default;
        }
    })();

    fetchAssetOverrides()
        .then((override) => resolveAssetOverrides(resourceBaseURL, override))
        .then((mappings) => AssetManager.imageMapping.setBasicImgMapping(mappings))
        .then(() => AssetManager.afterLoad(() => wearHamburgerOnThankYou()))
        .catch((error) => {
            Logger.error(`Failed to fetch asset overrides: ${error.message}`);
        });

    const mod = bcModSdk.registerMod(ModInfo);
    HookManager.initWithMod(mod);
    AssetManager.init(setup);

    AssetManager.enableValidation((param) => {
        const from = ChatRoomCharacter.find((c) => c.MemberNumber === param.sourceMemberNumber);
        return from && !!CharacterTag.get(from, ModInfo.name);
    });

    if (Player?.MemberNumber) {
        const userLanguage = navigator.language.startsWith("zh") ? "zh" : "en";
        Logger.warn(message[userLanguage]);
    }
});
