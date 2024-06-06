import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
    {
        files: ['**/*.js'],
        languageOptions: { sourceType: 'script' },
    },
    {
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        // This object will specify custom rules
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            // Add other rules here
        },
    },
]
