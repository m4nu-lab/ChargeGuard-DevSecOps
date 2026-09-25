const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.node
    }
  },
  js.configs.recommended
];
