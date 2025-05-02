import playwright from 'eslint-plugin-playwright';
import angularEslintPlugin from '@angular-eslint/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  playwright.configs['flat/recommended'],
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.js'],
    plugins: {
      '@angular-eslint': angularEslintPlugin,
    },

    // Override or add rules here
    rules: {
      ...angularEslintPlugin.configs.recommended.rules,
    },
  },
];
