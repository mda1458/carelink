import strictOverlay from './eslint.strict.mjs';
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
export default [
  ...strictOverlay,
  { ignores: ["**/.next/**","**/dist/**","**/node_modules/**"] },
  { files: ["**/*.{ts,tsx}"], languageOptions: { parser: tsparser }, plugins: { "@typescript-eslint": tseslint, "react": reactPlugin },
    settings: { react: { version: "detect" } },
    rules: { "no-console":"warn", "react/button-has-type":"error" } }
];
