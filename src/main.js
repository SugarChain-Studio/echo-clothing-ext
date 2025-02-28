import AssetManager from "@mod-utils/AssetManager";
import ModManager from "@mod-utils/ModManager";
import { ModInfo } from "@mod-utils/rollupHelper";

import { setup } from "./components";
import { once } from "@mod-utils/loadFlag";
import log from "@mod-utils/log";

const message = {
    en: "Player appearance is already loaded when enabling custom assets, some assets may be lost.",
    zh: "启用自定义资源时，玩家外观已经加载，可能会丢失一些资源。",
};

once(ModInfo.name, () => {
    ModManager.init(ModInfo);
    AssetManager.init(setup);

    if (Player?.MemberNumber) {
        const userLanguage = navigator.language.startsWith("zh") ? "zh" : "en";
        log.warn(message[userLanguage]);
    }
});
