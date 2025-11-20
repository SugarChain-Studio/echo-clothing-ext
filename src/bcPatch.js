import { HookManager } from "@sugarch/bc-mod-hook-manager";

export default function () {
    HookManager.patchFunction("CharacterCheckHooks", {
        '(Layer.Visibility == "OthersExceptDialog" && !(inDialog && !C.IsPlayer()))':
            '(Layer.Visibility == "OthersExceptDialog" && !inDialog && !C.IsPlayer())',
    });

    HookManager.patchFunction("DrawRefreshCharacterForImage", {
        "const path = url.pathname;": "const path = decodeURI(url.pathname);",
    });
}
