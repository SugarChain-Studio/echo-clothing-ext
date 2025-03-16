import AssetManager from "@mod-utils/AssetManager";
import ModManager from "@mod-utils/ModManager";
import { ModInfo } from "@mod-utils/rollupHelper";

import { setup } from "./components";
import { once } from "@mod-utils/loadFlag";
import { CharacterTag } from "@mod-utils/charaTag";
import log from "@mod-utils/log";

const message = {
    en: "Initiating custom assets registration after player appearance loaded, some assets may be lost.",
    zh: "在玩家外观加载后初始化自定义资产注册，部分资产可能丢失。",
};

once(ModInfo.name, () => {
    ModManager.init(ModInfo);
    AssetManager.init(setup);

    AssetManager.enableNonModValidation((param) => {
        const from = ChatRoomCharacter.find((c) => c.MemberNumber === param.sourceMemberNumber);
        return from && !!CharacterTag.get(from, ModInfo.name);
    });

    if (Player?.MemberNumber) {
        const userLanguage = navigator.language.startsWith("zh") ? "zh" : "en";
        log.warn(message[userLanguage]);
    }
});
