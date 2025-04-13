module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    extends: [
        'plugin:vue/vue3-recommended',
        '@nuxt/eslint-config',
    ],
    globals: {
        useCookie: 'readonly',
        navigateTo: 'readonly',
        usePermissoes: 'readonly',
        useAuthRequest: 'readonly',
        useToastCustom: 'readonly',
        Severity: 'readonly',
    },
    rules: {
        'vue/no-template-shadow': 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/require-explicit-emits' : 'off',
        'comma-dangle': ['error', 'always-multiline'],
        'array-bracket-spacing': ['error', 'never'],
        // 'indent': ['error', 2,  { 'ignoredNodes': ['PropertyDefinition'], 'SwitchCase': 1 }],
        'vue/html-indent': ['error', 2, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }],
        'vue/script-indent': ['error', 2, {
            'baseIndent': 1,
            'switchCase': 1,
            'ignores': []
        }],
        'vue/no-static-inline-styles': ['error', {
            'allowBinding': false
        }],
        'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'named': 'never',
            'asyncArrow': 'always'
        }],
        'semi': ['error', 'always'],
    },
    overrides: [
        {
            'files': [
                'layouts/auth.vue',
                'layouts/default.vue',
                'middleware/auth.global.ts',
                'composables/common/request.ts',
            ],
            'rules': {
                '@typescript-eslint/no-unused-vars': 'off',
            }
        },
    ]
}
  