import { defineConfig, globalIgnores } from "eslint/config"
import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import react from "eslint-plugin-react"
import hooks from "eslint-plugin-react-hooks"

export default defineConfig([
  globalIgnores([".next*/**", "node_modules/**", "storage/**", "out/**", "build/**", "next-env.d.ts", "test-results/**", "playwright-report/**"]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } }, rules: { "no-unused-vars": "off", "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "none" }] } },
  { files: ["src/**/*.{jsx,tsx}"], ...react.configs.flat.recommended, settings: { react: { version: "detect" } }, rules: { ...react.configs.flat.recommended.rules, "react/react-in-jsx-scope": "off", "react/prop-types": "off", "react/no-unknown-property": ["error", { ignore: ["jsx", "global"] }] } },
  { files: ["src/**/*.{jsx,tsx,ts,js}"], plugins: { "react-hooks": hooks }, rules: hooks.configs.flat.recommended.rules },
  { files: ["src/**/*.{jsx,tsx}"], rules: { "no-restricted-syntax": ["warn", { selector: "JSXOpeningElement[name.name='img']", message: "Prefer next/image for optimized images; justify raw img for unconfigured external URLs." }] } },
  { files: ["scripts/**/*.cjs", "scripts/**/*.js", "e2e/**/*.cjs", "*.cjs", "sync-articles.js"], rules: { "@typescript-eslint/no-require-imports": "off" } },
])
