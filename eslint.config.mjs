import eslint from "@eslint/js";
import globals from "globals";

export default [
    {
        // 全局变量配置
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.browser,
            },
        },
        // 限定只检查 src 和 utils 目录下的 JS 文件
        files: ["src/**/*.js", "utils/**/*.js"],
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
        },
    },
];
