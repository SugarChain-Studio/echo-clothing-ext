import eslint from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import localPlugin from "./scripts/eslint-plugin-local.mjs";

// Select locale using Intl first, then env; default to 'en'.
const intlLocale = (() => {
    try {
        return typeof Intl !== "undefined" && Intl.DateTimeFormat ? Intl.DateTimeFormat().resolvedOptions().locale : "";
    } catch {
        return "";
    }
})();
const envLocale = (process.env.ESLINT_LOCALE || process.env.LANG || "").toLowerCase();
const rawLocale = String(intlLocale || envLocale).toLowerCase();
const locale = rawLocale.includes("zh") || rawLocale.includes("cn") ? "zh" : "en";
const msgRestrictedLiteral =
    locale === "zh"
        ? "请使用 'DestinationCharacter' 代替 'TargetCharacter's'，保持正确所有格形式。"
        : "Please use 'DestinationCharacter' instead of 'TargetCharacter's' to keep correct possessive form.";
const msgRestrictedTemplate = msgRestrictedLiteral;

export default [
    {
        // 全局变量配置
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.browser,
            },
            parser: tsParser,
            parserOptions: {
                project: ["./jsconfig.json"],
                tsconfigRootDir: process.cwd(),
                ecmaVersion: 2022,
                sourceType: "module",
            },
        },
        // Rule settings shared to plugins (locale for messages)
        settings: { locale },
        // 本地插件
        plugins: { local: localPlugin },
        // 仅检查与工程类型信息一致的路径（与 jsconfig.include 对齐）
        files: ["src/**/*.js", "utils/src/**/*.js"],
        // 忽略特定文件
        ignores: ["**/node_modules/**", "dist/**", "build/**", "**/*.min.js"],
        // 使用 ESLint 推荐的规则集
        ...eslint.configs.recommended,
        // 自定义规则
        rules: {
            // 错误防护
            "no-var": "error",
            "prefer-const": "error",
            "eqeqeq": ["error", "always", { null: "ignore" }],
            "no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
            "no-console": ["warn", { allow: ["warn", "error", "info"] }],

            // 格式和风格
            "semi": ["error", "always"],
            "quotes": ["warn", "double", { allowTemplateLiterals: true, avoidEscape: true }],
            "comma-dangle": [
                "warn",
                {
                    arrays: "always-multiline",
                    objects: "always-multiline",
                    imports: "always-multiline",
                    exports: "always-multiline",
                    functions: "never",
                },
            ],
            "indent": ["warn", 4, { SwitchCase: 1 }],
            "object-shorthand": "warn",
            "arrow-body-style": ["warn", "as-needed"],
            "prefer-template": "warn",

            // 最佳实践
            "no-eval": "error",
            "no-implied-eval": "error",
            "no-param-reassign": "warn",
            "prefer-spread": "warn",

            // 使用插件规则替代字符串中 "TargetCharacter's" 检查
            "local/no-targetcharacters-possessive": "error",

            // 自定义本地规则：禁止 CustomAssetDefinition 顶层 Name 含下划线（中英提示）
            "local/no-underscore-in-custom-asset-name": "error",
            // 自定义本地规则：AssetPoseMapping 中 TapedHands 必须最后（中英提示）
            "local/tapedhands-last-in-assetposemapping": "error",
        },
    },
];
