// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default [
  // 1. GLOBAL IGNORES
  // This must be an object with ONLY the "ignores" key to apply globally
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/generated/**",
      "**/prisma/generated/**",
      "**/*.min.js",
    ],
  },

  // 2. BASE CONFIGS
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. TYPESCRIPT SPECIFIC CONFIG
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        // FIXED: Removed "project: './tsconfig.json'" to resolve the parsing error
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      // TypeScript Rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // Import Rules
      "import/no-cycle": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],

      // General Rules
      "no-console": "warn",
    },
  },
];