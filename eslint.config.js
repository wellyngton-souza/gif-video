// eslint.config.js
import js from "@eslint/js";

export default [
  js.configs.recommended,
  
  {
    plugins: ["prettier"],
    extends: [
      "plugin:prettier/recommended", // Integrando o Prettier com ESLint
    ],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "quotes": ["error", "double"], // Configuração para garantir aspas duplas
      "prettier/prettier": ["error", { "singleQuote": false }] // Garante que o Prettier use aspas duplas
    }
  }
];
