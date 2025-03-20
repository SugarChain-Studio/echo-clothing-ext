import { AssetManager } from "./assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { assetOverrides, baseURL, ModInfo } from "@mod-utils/rollupHelper";

import { setup } from "./components";
import { once } from "@sugarch/bc-mod-utility";
import { CharacterTag } from "@mod-utils/charaTag";
import { Logger } from "@mod-utils/log";
import { resolveAssetOverrides } from "@sugarch/bc-asset-manager";

const message = {
    en: "Initiating custom assets registration after player appearance loaded, some assets may be lost.",
    zh: "在玩家外观加载后初始化自定义资产注册，部分资产可能丢失。",
};

once(ModInfo.name, () => {
    HookManager.setLogger(Logger);
    AssetManager.setLogger(Logger);

    resolveAssetOverrides(baseURL, assetOverrides).then((overrides) => {
        AssetManager.imageMapping.setBasicImgMapping(overrides);
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
