import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { sleepUntil } from "@sugarch/bc-mod-utility";

/**
 * 把成员函数的函数头改造成带 `function` 关键字的函数表达式头。
 *
 * 成员函数字符串化后形如 `name(args) { ... }`，ModSDK 会把它包在括号里求值，
 * 缺少 `function` 时并不是合法表达式。
 * @param {string} head 函数体中第一个 `{` 之前的部分
 * @returns {string | undefined}
 */
function toFunctionExpressionHead(head) {
    const match = /^(async\s+)?[\w$]+\s*\(/.exec(head);
    if (!match) return undefined;
    return match[1] ? `async function ${head.slice(match[1].length)}` : `function ${head}`;
}

/**
 * 取函数未被 ModSDK 加工过的原始源码。
 *
 * ModSDK 接管后会把对象上的方法替换成 router，直接读对象属性拿到的是 router
 * 而不是真实实现，因此优先从 `getPatchingInfo()` 的 `original` 取源码。
 * @param {string} name 点分路径，例如 "GLDrawImageCache._refreshCharactersForImage"
 * @returns {string | undefined}
 */
function getOriginalSource(name) {
    const modSdk = /** @type {any} */ (globalThis).bcModSdk;
    const original = modSdk?.getPatchingInfo?.().get(name)?.original;
    if (typeof original === "function") return original.toString();

    // 尚未被 ModSDK 接管时，对象上的方法就是原始实现
    const [objectName, methodName] = name.split(".");
    const fn = /** @type {any} */ (globalThis)[objectName]?.[methodName];
    return typeof fn === "function" ? fn.toString() : undefined;
}

/**
 * 把 ModSDK 生成的入口函数同步到实例与原型上。
 *
 * ModSDK 只在首次登记时把 router 挂到当时的实例属性上；`GLDrawImageCache` 之类
 * 可能被游戏重新创建，新实例没有该自有属性，调用会落回原型上的原始方法，
 * 表现为 patch 明明记录成功却仍执行原实现。这里直接取 ModSDK 的入口函数，
 * 同时写到实例和原型，保证当前与之后创建的实例都走补丁后的实现。
 * @param {string} name 点分路径
 */
function syncEntrypoint(name) {
    const [objectName, methodName] = name.split(".");
    const object = /** @type {any} */ (globalThis)[objectName];
    if (!object) return;

    const modSdk = /** @type {any} */ (globalThis).bcModSdk;
    const info = modSdk?.getPatchingInfo?.().get(name);
    const entrypoint = info?.sdkEntrypoint ?? info?.currentEntrypoint ?? object[methodName];
    if (typeof entrypoint !== "function") return;

    object[methodName] = entrypoint;
    const proto = Object.getPrototypeOf(object);
    if (proto && typeof proto[methodName] === "function") proto[methodName] = entrypoint;
}

/**
 * 对对象上的成员函数应用文本补丁。
 *
 * 补丁交给 ModSDK 的 `patchFunction` 应用：它会按文本替换 `original` 的源码后
 * 重新求值，这样 ModSDK 的 router、其他 mod 的 hook / patch 都能保留。
 * 由于成员函数源码缺少 `function` 关键字，额外补一条把函数头改成
 * `function ...` 的补丁，使其求值结果成为合法表达式。
 *
 * @param {string} name 点分路径，例如 "GLDrawImageCache._refreshCharactersForImage"
 * @param {Record<string, string>} patches
 */
function patchMemberFunction(name, patches) {
    const source = getOriginalSource(name);
    if (!source) return;

    const brace = source.indexOf("{");
    if (brace < 0) return;

    const head = source.slice(0, brace);
    const fixedHead = toFunctionExpressionHead(head);

    HookManager.patchFunction(name, fixedHead ? { [head]: fixedHead, ...patches } : patches);
    syncEntrypoint(name);
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

    HookManager.afterInit(async () => {
        // @ts-ignore: bc-stubs 仍是 R132，尚未包含 DrawImageCache
        await sleepUntil(() => !!globalThis["GLDrawImageCache"] && !!globalThis["DrawImageCache"], 100);
        patchMemberFunction("GLDrawImageCache._refreshCharactersForImage", patch);
        patchMemberFunction("DrawImageCache._refreshCharactersForImage", patch);
    });
}
