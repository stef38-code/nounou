import nx from '@nx/eslint-plugin';
import baseConfig from '../../../eslint.config.mjs';
import angularEslintPlugin from '@angular-eslint/eslint-plugin';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint': angularEslintPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.base.json',
        sourceType: 'module',
        ecmaVersion: 2020,
      },
    },

    rules: {
      ...angularEslintPlugin.configs.recommended.rules,
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
