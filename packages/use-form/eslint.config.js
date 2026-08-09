import { fixupPluginRules } from "@eslint/compat"
import js from "@eslint/js"
import prettier from "eslint-config-prettier"
import react from "eslint-plugin-react"
import tseslint from "typescript-eslint"

export default tseslint.config(
    {
        ignores: ["dist/**", "node_modules/**"],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        plugins: {
            // eslint-plugin-react is not ESLint 10-ready yet
            react: fixupPluginRules(react),
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            react: {
                // Avoid version auto-detect (uses removed getFilename in ESLint 10)
                version: "19",
            },
        },
        rules: {
            ...react.configs.flat.recommended.rules,
            ...react.configs.flat["jsx-runtime"].rules,
            "no-useless-escape": "off",
            "no-prototype-builtins": "off",
            "no-debugger": "off",
            "no-console": "off",
            "react/prop-types": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/consistent-type-exports": "error",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/ban-ts-comment": "off",
        },
    },
    prettier
)
