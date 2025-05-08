import nx from '@nx/eslint-plugin';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import angularEslintPlugin from '@angular-eslint/eslint-plugin';
import angularEslintTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import prettierPlugin from 'eslint-plugin-prettier';
import { globalIgnores } from "eslint/config";
import ngParser from '@angular-eslint/template-parser';
// Définir une constante pour les fichiers/dossiers à ignorer
const ignorePaths = [
  '**/dist',
  '**/node_modules',
  '**/coverage',
  '**/.nx',
  "**/.angular",
  '**/build/**',
  "**/.husky",
  "**/.git",
  "**/.vscode",
  "**/.idea"
];


// Configuration commune des plugins
const commonPlugins = {
  prettier: prettierPlugin,
  'jsx-a11y': jsxA11yPlugin,
  '@angular-eslint': angularEslintPlugin,
};

// Règles communes pour le formatage
const commonPrettierRules = {
  ...prettierPlugin.configs.rules
};

// Règles pour Angular ESLint
const angularEslintRules = {
  ...angularEslintPlugin.configs.recommended.rules,
};

// Règles pour JSX A11y
const jsxA11yRules = {
  ...jsxA11yPlugin.configs.recommended.rules,
  'jsx-a11y/alt-text': 'warn',
  'jsx-a11y/label-has-associated-control': 'warn',
  'jsx-a11y/no-static-element-interactions': 'warn',
};

export default [
  // Base NX et règles globales
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  globalIgnores(ignorePaths),
  // Fichiers TypeScript et JavaScript
  {
    files: ['**/*.ts', '**/*.js'],
    plugins: {
      ...commonPlugins,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      ...commonPrettierRules, // Formatage avec Prettier
      ...angularEslintRules,
      ...jsxA11yRules,
    },
  },

  // Fichiers TypeScript spécifiques avec options avancées de parsing
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.base.json',
        sourceType: 'module',
        ecmaVersion: 2020,
      },
    },
    plugins: {
      ...commonPlugins,
      '@angular-eslint': angularEslintPlugin,
    },
    rules: {
      ...angularEslintRules,
      ...jsxA11yRules,
      ...commonPrettierRules,
    },
  },

  // Fichiers HTML Angular
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: ngParser,
    },
    plugins: {
      '@angular-eslint/template': angularEslintTemplatePlugin,
    },
    rules: {
      ...angularEslintTemplatePlugin.configs.recommended.rules,
      '@angular-eslint/template/button-has-type': 'warn',
      '@angular-eslint/template/no-distracting-elements': 'warn',
      '@angular-eslint/template/table-scope': 'warn',
      '@angular-eslint/template/elements-content': 'warn', // Vérifie le contenu des balises comme <button>
      '@angular-eslint/template/label-has-associated-control': 'warn',
      '@angular-eslint/template/valid-aria': 'warn',
      '@angular-eslint/template/use-track-by-function': 'warn',
      ...commonPrettierRules, // Lancer les erreurs si le formatage est incorrect
    },
  },
];
