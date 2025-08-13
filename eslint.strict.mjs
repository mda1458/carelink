/** Extend your existing eslint config by importing this in eslint.config.mjs */
export default [
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-ts-comment": ["error", { "ts-ignore": true }],
      "no-console": ["error", { "allow": ["warn", "error"] }]
    }
  }
];
