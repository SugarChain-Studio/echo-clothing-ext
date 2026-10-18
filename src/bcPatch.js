import { HookManager } from "@sugarch/bc-mod-hook-manager";

/**
 * 对对象上的成员函数应用文本补丁。
 *
 * ModSDK 的 `patchFunction` 会把 `fn.toString()` 包在括号里再求值，但成员函数
 * 字符串化后是 `name(args) { ... }` 的形式，并不是合法表达式，因此需要先补上
 * `function` 关键字。
 *
 * @param {string} name 点分路径，例如 "GLDrawImageCache._refreshCharactersForImage"
 * @param {Record<string, string>} patches
 */
function patchMemberFunction(name, patches) {
    const [objectName, methodName] = name.split(".");
    const object = /** @type {any} */ (globalThis)[objectName];
    const original = object?.[methodName];
    if (typeof original !== "function") {
        return;
    }

    let source = original.toString();
    for (const [from, to] of Object.entries(patches)) {
        source = source.replaceAll(from, to);
    }
    if (!/^\s*function\b/.test(source)) {
        source = `function ${source}`;
    }

    // `new Function` compiles in the global scope, so the patched method doesn't capture local bindings.
    object[methodName] = new Function(`return (${source})`)();
}

export default function () {
    HookManager.patchFunction("CharacterCheckHooks", {
        '(Layer.Visibility == "OthersExceptDialog" && !(inDialog && !C.IsPlayer()))':
            '(Layer.Visibility == "OthersExceptDialog" && !inDialog && !C.IsPlayer())',
    });

    const patch = {
        "const path = new URL(img.url, location.href).pathname;":
            "const path = decodeURI(new URL(img.url, location.href).pathname);",
    };

    HookManager.afterInit(() => {
        patchMemberFunction("GLDrawImageCache._refreshCharactersForImage", patch);
        patchMemberFunction("DrawImageCache._refreshCharactersForImage", patch);
    });
}
