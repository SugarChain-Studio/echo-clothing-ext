import { AssetManager } from "./assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { debugFlag, ModInfo, resourceBaseURL } from "@mod-utils/rollupHelper";

import { setup } from "./components";
import { once } from "@sugarch/bc-mod-utility";
import { CharacterTag } from "@mod-utils/charaTag";
import { Logger } from "@mod-utils/log";
import { AfterAssetOverrides, CraftingCache } from "./lib";
import { fetchAssetOverrides } from "@mod-utils/fetchAssetOverrides";

import runBCPatch from "./bcPatch";
import runDrawMod from "./drawMod";

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

const jsDelivrBase = `https://cdn.jsdelivr.net/${ModInfo.repository?.replace("https://github.com/", "gh/")}`;

const assetPath = (path, version) => {
    if (debugFlag) {
        return `${resourceBaseURL}/${path}?v=${version}`;
    } else {
        return `${jsDelivrBase}@${version}/resources/${path}`;
    }
};

once(ModInfo.name, async () => {
    HookManager.setLogger(Logger);
    AssetManager.setLogger(Logger);

    CraftingCache.setup(Logger);

    runBCPatch();
    runDrawMod();

    fetchAssetOverrides()
        .then((override) => {
            /** @type {Record<string, string>} */
            const ret = {};
            for (const [version, paths] of Object.entries(override)) {
                for (const path of paths) {
                    ret[path] = assetPath(path, version);
                }
            }
            return ret;
        })
        .then((mappings) => AssetManager.imageMapping.setBasicImgMapping(mappings))
        .then(() => AssetManager.afterLoad(() => wearHamburgerOnThankYou()))
        .then(() => AfterAssetOverrides.run())
        .catch((error) => {
            Logger.error(`Failed to fetch asset overrides: ${error.message}`);
        });

    await import("https://cdn.jsdelivr.net/npm/bondage-club-mod-sdk@1.2.0");

    const mod = globalThis.bcModSdk.registerMod(ModInfo);
    HookManager.initWithMod(mod);
    AssetManager.init(setup);

    AssetManager.enableCustomAssetUseValidation((target) => !!CharacterTag.get(target, ModInfo.name));

    AssetManager.enableFromModUserValidation((param) => {
        const from = ChatRoomCharacter.find((c) => c.MemberNumber === param.sourceMemberNumber);
        return from && !!CharacterTag.get(from, ModInfo.name);
    });

    if (Player?.MemberNumber) {
        const userLanguage = navigator.language.startsWith("zh") ? "zh" : "en";
        Logger.warn(message[userLanguage]);
    }
});
