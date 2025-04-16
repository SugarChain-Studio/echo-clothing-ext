import { AssetManager } from "./assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { ModInfo } from "@mod-utils/rollupHelper";

import { setup } from "./components";
import { once } from "@sugarch/bc-mod-utility";
import { CharacterTag } from "@mod-utils/charaTag";
import { Logger } from "@mod-utils/log";
import { CraftingCache } from "./craftingCache";
import { fetchAssetOverrides } from "./fetchAssetOverrides";

const message = {
    en: "Initiating custom assets registration after player appearance loaded, some assets may be lost.",
    zh: "在玩家外观加载后初始化自定义资产注册，部分资产可能丢失。",
};

once(ModInfo.name, () => {
    HookManager.setLogger(Logger);
    AssetManager.setLogger(Logger);

    CraftingCache.setup(Logger);

    fetchAssetOverrides()
        .then(() => {
            AssetManager.afterLoad(() => {
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
            });
        })
        .catch((error) => {
            Logger.error(`Failed to fetch asset overrides: ${error.message}`);
        });

    HookManager.init(ModInfo);
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
