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
                // -----------------------------
                // 1. Environment & localization
                // -----------------------------
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

                // -----------------------------
                // 2. Generic helpers
                // -----------------------------
                const keyName = (key) => {
                    if (!key) return undefined;
                    if (key.type === "Identifier") return key.name;
                    if (key.type === "Literal") return String(key.value);
                    return undefined;
                };
                const isNameProperty = (prop) =>
                    prop && prop.type === "Property" && !prop.computed && keyName(prop.key) === "Name";
                const collectComments = (n) => {
                    if (!n) return [];
                    const before = sourceCode.getCommentsBefore(n) || [];
                    const after = sourceCode.getCommentsAfter(n) || [];
                    return before.concat(after);
                };
                const hasJSDocMatching = (node, regexp) => {
                    const comments = collectComments(node)
                        .concat(collectComments(node && node.parent))
                        .concat(
                            collectComments(
                                node && node.parent && node.parent.type === "VariableDeclarator"
                                    ? node.parent.parent
                                    : null
                            )
                        );
                    return comments.some((c) => regexp.test(c.value));
                };

                // -----------------------------
                // 3. Call-expression detectors
                // -----------------------------
                const isMemberIdentifier = (member, name) =>
                    member &&
                    member.type === "MemberExpression" &&
                    !member.computed &&
                    member.property.type === "Identifier" &&
                    member.property.name === name;
                const isAddAssetWithConfigCall = (node) =>
                    !!node &&
                    node.type === "CallExpression" &&
                    ((node.callee.type === "Identifier" && node.callee.name === "addAssetWithConfig") ||
                        isMemberIdentifier(node.callee, "addAssetWithConfig"));
                const isScreenLayerCall = (node) =>
                    !!node &&
                    node.type === "CallExpression" &&
                    ((node.callee.type === "Identifier" && node.callee.name === "screenLayer") ||
                        isMemberIdentifier(node.callee, "screenLayer"));

                // -----------------------------
                // 4. Type & JSDoc detection
                // -----------------------------
                const typeMatches = (obj, regexp) => {
                    if (!checker || !services.esTreeNodeToTSNodeMap || !obj) return false;
                    try {
                        const tsNode = services.esTreeNodeToTSNodeMap.get(obj);
                        if (!tsNode) return false;
                        const t = checker.getTypeAtLocation(tsNode);
                        return regexp.test(checker.typeToString(t));
                    } catch {
                        return false;
                    }
                };
                const isCustomAssetByType = (obj) => typeMatches(obj, /CustomAssetDefinition(\b|<)/);
                // Core layer type (direct or via generics/intersections)
                const isLayerCoreTypeByType = (obj) =>
                    typeMatches(obj, /(AssetLayerDefinition|\b[A-Za-z0-9_]*LayerDefinition)(\b|<)/);
                const hasCustomAssetJSDoc = (node) => hasJSDocMatching(node, /CustomAssetDefinition/);
                const hasLayerTypeJSDoc = (node) =>
                    hasJSDocMatching(node, /(AssetLayerDefinition|\b[A-Za-z0-9_]*LayerDefinition\b)/);

                // -----------------------------
                // 5. Shape heuristics
                // -----------------------------
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
                    const flags = [
                        hasLayerArray,
                        keys.has("ParentGroup"),
                        hasPlacement,
                        keys.has("Effect"),
                        keys.has("Extended"),
                        keys.has("Random"),
                        keys.has("Priority"),
                    ];
                    return keys.has("Name") && flags.some(Boolean);
                };

                // -----------------------------
                // 6. Classification
                // -----------------------------
                const isAssetLayerDefinition = (obj) => {
                    if (!obj || obj.type !== "ObjectExpression") return false;
                    // 1) Type or alias indicates layer definition
                    if (isLayerCoreTypeByType(obj)) return true;
                    // 2) JSDoc indicates layer definition (core or alias with *LayerDefinition suffix)
                    if (hasLayerTypeJSDoc(obj) || hasLayerTypeJSDoc(obj?.parent)) return true;
                    if (
                        obj.parent &&
                        obj.parent.parent &&
                        obj.parent.parent.type === "VariableDeclarator" &&
                        hasLayerTypeJSDoc(obj.parent.parent)
                    )
                        return true;
                    // 3) Structural fallback: likely layer-only keys without asset-only keys
                    try {
                        const keys = new Set(
                            obj.properties
                                .filter((p) => p && p.type === "Property")
                                .map((p) => keyName(p.key))
                                .filter(Boolean)
                        );
                        const layerOnlyHints = [
                            "ConfigKey",
                            "BlendingMode",
                            "PoseMapping",
                            "ColorGroup",
                            "CopyLayerColor",
                            "AllowTypes",
                            "HasImage",
                            "CreateLayerTypes",
                        ];
                        const assetHints = ["Extended", "Random", "Effect", "Layer", "DynamicGroupName", "CraftGroup"];
                        if (layerOnlyHints.some((k) => keys.has(k)) && !assetHints.some((k) => keys.has(k)))
                            return true;
                    } catch {}
                    return false;
                };

                const shouldCheckObject = (obj) => {
                    if (!obj || obj.type !== "ObjectExpression") return false;
                    // Skip layer array elements
                    if (
                        obj.parent &&
                        obj.parent.type === "ArrayExpression" &&
                        obj.parent.parent &&
                        obj.parent.parent.type === "Property" &&
                        keyName(obj.parent.parent.key) === "Layer"
                    )
                        return false;
                    // Skip screenLayer(...) parameter objects
                    if (obj.parent && obj.parent.type === "CallExpression" && isScreenLayerCall(obj.parent))
                        return false;
                    // Skip explicit AssetLayerDefinition objects
                    if (isAssetLayerDefinition(obj)) return false;
                    // Positive matches
                    if (isCustomAssetByType(obj)) return true;
                    if (hasCustomAssetJSDoc(obj) || hasCustomAssetJSDoc(obj.parent)) return true;
                    if (obj.parent && obj.parent.type === "VariableDeclarator" && hasCustomAssetJSDoc(obj.parent))
                        return true;
                    if (obj.parent && obj.parent.type === "CallExpression" && isAddAssetWithConfigCall(obj.parent)) {
                        if (obj.parent.arguments.indexOf(obj) === 1) return true; // second arg is definition
                    }
                    if (hasCustomAssetShape(obj)) return true;
                    return false;
                };

                // -----------------------------
                // 7. Reporting logic
                // -----------------------------
                const reported = new WeakSet();
                const reportIfNameHasUnderscore = (obj) => {
                    for (const prop of obj.properties) {
                        if (!isNameProperty(prop)) continue;
                        const v = prop.value;
                        if (v && v.type === "Literal" && typeof v.value === "string" && v.value.includes("_")) {
                            context.report({ node: v, message: MSG });
                        }
                        break; // only top-level Name once
                    }
                };
                const reportObjectOnce = (obj) => {
                    if (!obj || obj.type !== "ObjectExpression") return;
                    if (reported.has(obj)) return;
                    reportIfNameHasUnderscore(obj);
                    reported.add(obj);
                };

                // -----------------------------
                // 8. Tuple array scanner (addAssetWithConfig params)
                // -----------------------------
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

                // -----------------------------
                // 9. Visitors
                // -----------------------------
                return {
                    ObjectExpression(node) {
                        if (shouldCheckObject(node)) reportObjectOnce(node);
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
