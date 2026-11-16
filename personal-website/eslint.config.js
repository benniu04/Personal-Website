import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'dist-ssr']),
  {
    files: ['**/*.{js,jsx,mjs}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Components are only referenced from JSX, which core no-unused-vars
      // can't see without eslint-plugin-react
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    // three.js must stay inside the lazy island chunk so the text never waits on it
    files: ['src/**/*.{js,jsx}'],
    ignores: ['src/island/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [{ group: ['three', 'three/*', '@react-three/*'], message: 'Import three only inside src/island/.' }] },
      ],
    },
  },
])
