import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";

export default [
  { ignores: ["**/.next/**", "**/dist/**", "**/node_modules/**"] },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: { parser: tsparser },
    plugins: { "@typescript-eslint": tseslint, "react": reactPlugin },
    settings: { react: { version: "detect" } },
    rules: {
      "no-console": "warn",
      "react/button-has-type": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-ts-comment": ["error", { "ts-ignore": true }]
    }
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    rules: {
      "no-console": ["error", { "allow": ["warn", "error"] }]
    }
  }
];
