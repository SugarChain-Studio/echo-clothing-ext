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

            // 检查字符串中的"TargetCharacter's"
            "no-restricted-syntax": [
                "error",
                {
                    // 匹配普通字符串字面量
                    selector: "Literal[value=/TargetCharacter's/]",
                    message: "请使用 'DestinationCharacter' 代替 'TargetCharacter's'，保持正确所有格形式。",
                },
                {
                    // 匹配模板字符串中的内容
                    selector: "TemplateElement[value.raw=/TargetCharacter's/]",
                    message: "请使用 'DestinationCharacter' 代替 'TargetCharacter's'，保持正确所有格形式。",
                },
            ],
        },
    },
];
