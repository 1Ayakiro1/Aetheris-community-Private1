module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript"
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    // свои правила
    "vue/multi-word-component-names": "off",
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
  }
};
