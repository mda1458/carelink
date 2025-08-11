import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
export default [
  { ignores: ["**/.next/**","**/dist/**","**/node_modules/**"] },
  { files: ["**/*.{ts,tsx}"], languageOptions: { parser: tsparser }, plugins: { "@typescript-eslint": tseslint },
    rules: { "no-console":"warn", "react/button-has-type":"error" } }
];
