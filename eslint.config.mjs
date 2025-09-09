import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:better-tailwindcss/recommended"
  ),
  {
    settings: {
      "better-tailwindcss": {
        "entryPoint": "app/globals.css",
      }
    },
    rules: {
      // General code quality
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-unused-expressions": "error",

      // Best practices
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "prefer-const": "error",
      "no-var": "error",

      // Code style
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],

      // Better Tailwind CSS rules
      "better-tailwindcss/enforce-consistent-class-order": "warn",
      "better-tailwindcss/enforce-consistent-line-wrapping": "warn",
      "better-tailwindcss/enforce-shorthand-classes": "warn",
      "better-tailwindcss/no-duplicate-classes": "error",
      "better-tailwindcss/no-unnecessary-whitespace": "warn",
      // This rule is disabled for DaisyUI
      "better-tailwindcss/no-unregistered-classes": "off",
      "better-tailwindcss/no-conflicting-classes": "error",

      // React/Next.js specific (since you're using Next.js)
      "react/prop-types": "off", // TypeScript handles this
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;