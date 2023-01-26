module.exports = {
  overrides: [
    {
      files: ['src/pages/**/index.vue'],
      rules: {
        'vue/multi-word-component-names': "off"
      }
    }
  ],
  extends: [
    'plugin:vue/vue3-recommended',
    'standard',
  ],
  parserOptions: {
    // js的版本
    ecmaVersion: 13,
    // 解析器
    parser: '@typescript-eslint/parser',
    // 模块化方案
    sourceType: 'module',
  },
}