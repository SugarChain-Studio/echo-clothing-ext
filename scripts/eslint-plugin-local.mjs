// Local ESLint plugin for echo-clothing-ext

// Shared locale resolver to avoid duplication in each rule
function resolveLocale(context) {
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
    return /zh|cn/i.test(String(rawLocale)) ? "zh" : "en";
}

/** @type {import('eslint').ESLint.Plugin} */
const plugin = {
    rules: {
        "no-underscore-in-custom-asset-name": {
            meta: {
                type: "problem",
                docs: { description: "Disallow underscores in CustomAssetDefinition top-level Name" },
                schema: [],
                messages: {},
            },
            create(context) {
                const sourceCode = context.getSourceCode();
                const services = /** @type {any} */ (context.parserServices ?? {});
                const program = services.program;
                const checker = program && program.getTypeChecker ? program.getTypeChecker() : null;
                const locale = resolveLocale(context);
                const MSG =
                    locale === "zh"
                        ? "自定义资源定义字段 Name 不可包含下划线 '_'。"
                        : "CustomAssetDefinition Name cannot contain underscores ('_').";

                // Generic helpers
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

                // Call-expression detectors
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

                // Type & JSDoc detection
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
                const isLayerCoreTypeByType = (obj) =>
                    typeMatches(obj, /(AssetLayerDefinition|\b[A-Za-z0-9_]*LayerDefinition)(\b|<)/);
                const hasCustomAssetJSDoc = (node) => hasJSDocMatching(node, /CustomAssetDefinition/);
                const hasLayerTypeJSDoc = (node) =>
                    hasJSDocMatching(node, /(AssetLayerDefinition|\b[A-Za-z0-9_]*LayerDefinition\b)/);

                // Shape heuristics
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

                // Classification
                const isAssetLayerDefinition = (obj) => {
                    if (!obj || obj.type !== "ObjectExpression") return false;
                    if (isLayerCoreTypeByType(obj)) return true;
                    if (hasLayerTypeJSDoc(obj) || hasLayerTypeJSDoc(obj?.parent)) return true;
                    if (
                        obj.parent &&
                        obj.parent.parent &&
                        obj.parent.parent.type === "VariableDeclarator" &&
                        hasLayerTypeJSDoc(obj.parent.parent)
                    )
                        return true;
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
                    if (
                        obj.parent &&
                        obj.parent.type === "ArrayExpression" &&
                        obj.parent.parent &&
                        obj.parent.parent.type === "Property" &&
                        keyName(obj.parent.parent.key) === "Layer"
                    )
                        return false;
                    if (obj.parent && obj.parent.type === "CallExpression" && isScreenLayerCall(obj.parent))
                        return false;
                    if (isAssetLayerDefinition(obj)) return false;
                    if (isCustomAssetByType(obj)) return true;
                    if (hasCustomAssetJSDoc(obj) || hasCustomAssetJSDoc(obj.parent)) return true;
                    if (obj.parent && obj.parent.type === "VariableDeclarator" && hasCustomAssetJSDoc(obj.parent))
                        return true;
                    if (obj.parent && obj.parent.type === "CallExpression" && isAddAssetWithConfigCall(obj.parent)) {
                        if (obj.parent.arguments.indexOf(obj) === 1) return true;
                    }
                    if (hasCustomAssetShape(obj)) return true;
                    return false;
                };

                // Reporting logic
                const reported = new WeakSet();
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
                const reportObjectOnce = (obj) => {
                    if (!obj || obj.type !== "ObjectExpression") return;
                    if (reported.has(obj)) return;
                    reportIfNameHasUnderscore(obj);
                    reported.add(obj);
                };

                // Tuple array scanner
                const scanParamsTupleArray = (arrayExpr, hint /* 'withGroup' | 'noGroup' | undefined */) => {
                    if (!arrayExpr || arrayExpr.type !== "ArrayExpression") return;
                    const isNoGroupByDoc = hasJSDocMatching(arrayExpr.parent, /AddAssetWithConfigParamsNoGroup\s*\[/);
                    const isWithGroupByDoc = hasJSDocMatching(arrayExpr.parent, /AddAssetWithConfigParams\s*\[/);
                    const resolvedHint = isNoGroupByDoc ? "noGroup" : isWithGroupByDoc ? "withGroup" : hint;
                    for (const el of arrayExpr.elements) {
                        if (!el || el.type !== "ArrayExpression") continue;
                        const tupleEls = el.elements || [];
                        if (resolvedHint !== "withGroup" && tupleEls[0] && tupleEls[0].type === "ObjectExpression") {
                            reportObjectOnce(tupleEls[0]);
                            continue;
                        }
                        if (tupleEls[1] && tupleEls[1].type === "ObjectExpression") {
                            reportObjectOnce(tupleEls[1]);
                        }
                    }
                };

                return {
                    ObjectExpression(node) {
                        if (shouldCheckObject(node)) reportObjectOnce(node);
                    },
                    CallExpression(node) {
                        if (!isAddAssetWithConfigCall(node)) return;
                        const args = node.arguments;
                        if (args[1] && args[1].type === "ObjectExpression") {
                            reportObjectOnce(args[1]);
                        } else if (args[1] && args[1].type === "ArrayExpression") {
                            scanParamsTupleArray(args[1], "noGroup");
                        }
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
        "tapedhands-last-in-assetposemapping": {
            meta: {
                type: "problem",
                docs: {
                    description:
                        "Require 'TapedHands' key to be the last property in AssetPoseMapping objects to avoid implementation issues",
                },
                fixable: "code",
                schema: [],
                messages: {
                    notLastZh: "'TapedHands' 必须在 AssetPoseMapping 对象的最后一个属性。",
                    notLastEn: "'TapedHands' must be the last property in an AssetPoseMapping object.",
                },
            },
            create(context) {
                const sourceCode = context.getSourceCode();
                const locale = resolveLocale(context);
                const isZh = locale === "zh";
                const isAssetPoseMappingObject = (obj) => {
                    if (!obj || obj.type !== "ObjectExpression") return false;
                    for (const prop of obj.properties) {
                        if (prop.type === "SpreadElement") {
                            if (
                                prop.argument.type === "MemberExpression" &&
                                !prop.argument.computed &&
                                prop.argument.object.type === "Identifier" &&
                                prop.argument.object.name === "AssetPoseMapping"
                            )
                                return true;
                            if (prop.argument.type === "Identifier" && prop.argument.name === "AssetPoseMapping")
                                return true;
                        }
                    }
                    const comments = sourceCode.getCommentsBefore(obj).concat(sourceCode.getCommentsAfter(obj));
                    if (comments.some((c) => /AssetPoseMapping/.test(c.value))) return true;
                    if (obj.parent && obj.parent.type === "VariableDeclarator") {
                        const varComments = sourceCode
                            .getCommentsBefore(obj.parent.parent)
                            .concat(sourceCode.getCommentsAfter(obj.parent.parent));
                        if (varComments.some((c) => /AssetPoseMapping/.test(c.value))) return true;
                    }
                    return false;
                };
                const getTapedHandsProperty = (obj) => {
                    if (!obj || obj.type !== "ObjectExpression") return null;
                    for (let i = 0; i < obj.properties.length; i++) {
                        const p = obj.properties[i];
                        if (p.type === "Property" && !p.computed) {
                            if (p.key.type === "Identifier" && p.key.name === "TapedHands")
                                return { index: i, prop: p };
                            if (p.key.type === "Literal" && p.key.value === "TapedHands") return { index: i, prop: p };
                        }
                    }
                    return null;
                };
                return {
                    ObjectExpression(node) {
                        if (!isAssetPoseMappingObject(node)) return;
                        const taped = getTapedHandsProperty(node);
                        if (!taped) return;
                        if (taped.index !== node.properties.length - 1) {
                            context.report({
                                node: taped.prop.key,
                                messageId: isZh ? "notLastZh" : "notLastEn",
                                fix(fixer) {
                                    const tapedProp = taped.prop;
                                    const objText = sourceCode.getText(node);
                                    const firstProp = node.properties[0];
                                    const lineStartIdx = sourceCode.text.lastIndexOf("\n", firstProp.range[0] - 1) + 1;
                                    const indentMatch = /[ \t]*/.exec(
                                        sourceCode.text.slice(lineStartIdx, firstProp.range[0])
                                    ) || [""];
                                    const indent = indentMatch[0];
                                    const ordered = node.properties.filter((p) => p !== tapedProp).concat([tapedProp]);
                                    const propLines = ordered.map((p) =>
                                        sourceCode
                                            .getText(p)
                                            .trim()
                                            .replace(/,+\s*$/, "")
                                    );
                                    const formatted = propLines.map((l) => indent + l + ",");
                                    const openingBrace = sourceCode.getFirstToken(node);
                                    const closingBrace = sourceCode.getLastToken(node);
                                    const innerStart = openingBrace.range[1];
                                    const innerEnd = closingBrace.range[0];
                                    const eol = /\r\n/.test(objText) ? "\r\n" : "\n";
                                    const newInner = eol + formatted.join(eol) + eol;
                                    return [fixer.replaceTextRange([innerStart, innerEnd], newInner)];
                                },
                            });
                        }
                    },
                };
            },
        },
        "no-targetcharacters-possessive": {
            meta: {
                type: "problem",
                docs: {
                    description:
                        "Disallow 'TargetCharacter's' in strings; use 'DestinationCharacter' for correct pronoun substitution",
                },
                fixable: "code",
                schema: [],
                messages: {
                    zh: "请使用 'DestinationCharacter' 代替 'TargetCharacter's'，避免产生 her's / he's 等错误所有格。",
                    en: "Use 'DestinationCharacter' instead of 'TargetCharacter's' to avoid incorrect possessives like her's / he's.",
                },
            },
            create(context) {
                const locale = resolveLocale(context);
                const messageId = locale === "zh" ? "zh" : "en";
                const pattern = /TargetCharacter's/g;
                const sourceCode = context.getSourceCode();
                return {
                    Literal(node) {
                        if (typeof node.value !== "string") return;
                        if (!pattern.test(node.value)) return;
                        context.report({
                            node,
                            messageId,
                            fix(fixer) {
                                const original = sourceCode.getText(node);
                                const quote = original[0];
                                const inner = original.slice(1, -1);
                                const replacedInner = inner.replace(pattern, "DestinationCharacter");
                                const safeInner =
                                    quote === '"'
                                        ? replacedInner.replace(/"/g, '\\"')
                                        : quote === "'"
                                        ? replacedInner.replace(/'/g, "\\'")
                                        : replacedInner;
                                return fixer.replaceText(node, quote + safeInner + quote);
                            },
                        });
                    },
                    TemplateLiteral(node) {
                        // Reconstruct full template literal if any quasi contains pattern
                        let changed = false;
                        const newQuasis = node.quasis.map((q) => {
                            const raw = q.value.raw;
                            if (pattern.test(raw)) {
                                changed = true;
                                return raw.replace(pattern, "DestinationCharacter");
                            }
                            return raw;
                        });
                        if (!changed) return;
                        // Report on first offending quasi
                        const firstOffender = node.quasis.find((q) => pattern.test(q.value.raw)) || node;
                        context.report({
                            node: firstOffender,
                            messageId,
                            fix(fixer) {
                                // Preserve expressions order; rebuild: `quasi0${expr0}quasi1${expr1}...` etc.
                                let rebuilt = "`";
                                for (let i = 0; i < newQuasis.length; i++) {
                                    rebuilt += newQuasis[i];
                                    if (i < node.expressions.length) {
                                        const exprText = sourceCode.getText(node.expressions[i]);
                                        rebuilt += "${" + exprText + "}";
                                    }
                                }
                                rebuilt += "`";
                                return fixer.replaceText(node, rebuilt);
                            },
                        });
                    },
                };
            },
        },
    },
};

export default plugin;
