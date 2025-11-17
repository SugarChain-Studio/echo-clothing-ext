// Local ESLint plugin for echo-clothing-ext

/** @type {import('eslint').ESLint.Plugin} */
const plugin = {
    rules: {
        "no-underscore-in-custom-asset-name": {
            meta: {
                type: "problem",
                docs: {
                    description: "Disallow underscores in CustomAssetDefinition top-level Name",
                },
                schema: [],
                messages: {},
            },
            create(context) {
                const sourceCode = context.getSourceCode();
                const services = /** @type {any} */ (context.parserServices ?? {});
                const program = services.program;
                const checker = program && program.getTypeChecker ? program.getTypeChecker() : null;

                const intlLocale = (() => {
                    try {
                        return typeof Intl !== "undefined" && Intl.DateTimeFormat
                            ? Intl.DateTimeFormat().resolvedOptions().locale
                            : "";
                    } catch {
                        return "";
                    }
                })();
                const rawLocale =
                    (context.settings && context.settings.locale) ||
                    intlLocale ||
                    process.env.ESLINT_LOCALE ||
                    process.env.LANG ||
                    "";
                const locale = /zh|cn/i.test(String(rawLocale)) ? "zh" : "en";
                const MSG =
                    locale === "zh"
                        ? "自定义资源定义字段 Name 不可包含下划线 '_'。"
                        : "CustomAssetDefinition Name cannot contain underscores ('_').";

                const keyName = (key) => {
                    if (!key) return undefined;
                    if (key.type === "Identifier") return key.name;
                    if (key.type === "Literal") return String(key.value);
                    return undefined;
                };

                const isNameProperty = (prop) => {
                    return prop && prop.type === "Property" && !prop.computed && keyName(prop.key) === "Name";
                };

                const isAddAssetWithConfigCall = (node) => {
                    if (!node || node.type !== "CallExpression") return false;
                    const callee = node.callee;
                    if (callee.type === "Identifier") return callee.name === "addAssetWithConfig";
                    if (
                        callee.type === "MemberExpression" &&
                        !callee.computed &&
                        callee.property.type === "Identifier"
                    ) {
                        return callee.property.name === "addAssetWithConfig";
                    }
                    return false;
                };

                const hasCustomAssetShape = (obj) => {
                    if (!obj || obj.type !== "ObjectExpression") return false;
                    const keys = new Set(
                        obj.properties
                            .filter((p) => p && p.type === "Property")
                            .map((p) => keyName(p.key))
                            .filter(Boolean)
                    );
                    const layerProp = obj.properties.find((p) => p.type === "Property" && keyName(p.key) === "Layer");
                    const hasLayerArray = !!(layerProp && layerProp.value.type === "ArrayExpression");
                    const hasPlacement = keys.has("Left") || keys.has("Top");
                    const hasEffects = keys.has("Effect");
                    const hasParentGroup = keys.has("ParentGroup");
                    return hasLayerArray && (hasParentGroup || hasPlacement || hasEffects);
                };

                const hasCustomAssetJSDoc = (node) => {
                    if (!node) return false;
                    const before = sourceCode.getCommentsBefore(node) || [];
                    const after = sourceCode.getCommentsAfter(node) || [];
                    const all = before.concat(after);
                    return all.some((c) => /CustomAssetDefinition/.test(c.value));
                };

                const isCustomAssetByType = (obj) => {
                    try {
                        if (!checker || !services.esTreeNodeToTSNodeMap) return false;
                        const tsNode = services.esTreeNodeToTSNodeMap.get(obj);
                        if (!tsNode) return false;
                        const t = checker.getTypeAtLocation(tsNode);
                        const text = checker.typeToString(t);
                        return /CustomAssetDefinition(\b|<)/.test(text);
                    } catch {
                        return false;
                    }
                };

                const shouldCheckObject = (obj) => {
                    if (!obj || obj.type !== "ObjectExpression") return false;
                    if (isCustomAssetByType(obj)) return true;
                    if (hasCustomAssetJSDoc(obj) || hasCustomAssetJSDoc(obj.parent)) return true;
                    if (obj.parent && obj.parent.type === "VariableDeclarator" && hasCustomAssetJSDoc(obj.parent))
                        return true;
                    if (obj.parent && obj.parent.type === "CallExpression" && isAddAssetWithConfigCall(obj.parent)) {
                        const args = obj.parent.arguments;
                        const idx = args.indexOf(obj);
                        if (idx === 1) return true;
                    }
                    if (hasCustomAssetShape(obj)) return true;
                    return false;
                };

                const reportIfNameHasUnderscore = (obj) => {
                    for (const prop of obj.properties) {
                        if (!isNameProperty(prop)) continue;
                        const v = prop.value;
                        if (v && v.type === "Literal" && typeof v.value === "string" && v.value.includes("_")) {
                            context.report({ node: v, message: MSG });
                        }
                        break;
                    }
                };

                const reported = new WeakSet();

                const reportObjectOnce = (obj) => {
                    if (!obj || obj.type !== "ObjectExpression") return;
                    if (reported.has(obj)) return;
                    reportIfNameHasUnderscore(obj);
                    reported.add(obj);
                };

                const hasJSDocMatching = (node, regexp) => {
                    const collect = (n) => {
                        if (!n) return [];
                        const before = sourceCode.getCommentsBefore(n) || [];
                        const after = sourceCode.getCommentsAfter(n) || [];
                        return before.concat(after);
                    };
                    const comments = collect(node)
                        .concat(collect(node && node.parent))
                        .concat(
                            collect(
                                node && node.parent && node.parent.type === "VariableDeclarator"
                                    ? node.parent.parent
                                    : null
                            )
                        );
                    return comments.some((c) => regexp.test(c.value));
                };

                const scanParamsTupleArray = (arrayExpr, hint /* 'withGroup' | 'noGroup' | undefined */) => {
                    if (!arrayExpr || arrayExpr.type !== "ArrayExpression") return;
                    const isNoGroupByDoc = hasJSDocMatching(arrayExpr.parent, /AddAssetWithConfigParamsNoGroup\s*\[/);
                    const isWithGroupByDoc = hasJSDocMatching(arrayExpr.parent, /AddAssetWithConfigParams\s*\[/);
                    const resolvedHint = isNoGroupByDoc ? "noGroup" : isWithGroupByDoc ? "withGroup" : hint;
                    for (const el of arrayExpr.elements) {
                        if (!el || el.type !== "ArrayExpression") continue;
                        const tupleEls = el.elements || [];
                        // NoGroup: [CustomAssetDefinition, Config]
                        if (resolvedHint !== "withGroup" && tupleEls[0] && tupleEls[0].type === "ObjectExpression") {
                            reportObjectOnce(tupleEls[0]);
                            continue;
                        }
                        // WithGroup: [DynGroupName(s), CustomAssetDefinition, Config]
                        if (tupleEls[1] && tupleEls[1].type === "ObjectExpression") {
                            reportObjectOnce(tupleEls[1]);
                        }
                    }
                };

                return {
                    ObjectExpression(node) {
                        if (!shouldCheckObject(node)) return;
                        reportObjectOnce(node);
                    },
                    CallExpression(node) {
                        if (!isAddAssetWithConfigCall(node)) return;
                        const args = node.arguments;
                        // Two-arg form: addAssetWithConfig(group, def | params[])
                        if (args[1] && args[1].type === "ObjectExpression") {
                            reportObjectOnce(args[1]);
                        } else if (args[1] && args[1].type === "ArrayExpression") {
                            scanParamsTupleArray(args[1], "noGroup");
                        }
                        // One-arg form: addAssetWithConfig(params[])
                        if (args.length === 1 && args[0] && args[0].type === "ArrayExpression") {
                            scanParamsTupleArray(args[0], "withGroup");
                        }
                    },
                    VariableDeclarator(node) {
                        if (!node.init || node.init.type !== "ArrayExpression") return;
                        if (
                            hasJSDocMatching(node, /AddAssetWithConfigParamsNoGroup\s*\[/) ||
                            hasJSDocMatching(node, /AddAssetWithConfigParams\s*\[/)
                        ) {
                            scanParamsTupleArray(node.init);
                        }
                    },
                };
            },
        },
    },
};

export default plugin;
