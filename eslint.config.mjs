import nx from '@nx/eslint-plugin';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import angularEslintPlugin from '@angular-eslint/eslint-plugin';
import angularEslintTemplatePlugin from '@angular-eslint/eslint-plugin-template';


export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
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
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
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
      '@angular-eslint': angularEslintPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      ...angularEslintPlugin.configs.recommended.rules, // Charger les règles Angular recommandées
      ...jsxA11yPlugin.configs.recommended.rules, // Charger les règles d'accessibilité recommandées
      'jsx-a11y/alt-text': 'warn', // Vérifie les balises nécessitant un texte alternatif
      'jsx-a11y/label-has-associated-control': 'warn', // Vérifie l'association des labels avec les inputs
      'jsx-a11y/no-static-element-interactions': 'warn', // Évite d'utiliser des événements interactifs sur des éléments non interactifs
    },
  },
  // Règles pour les fichiers HTML Angular
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angularEslintTemplatePlugin,
      'jsx-a11y': jsxA11yPlugin,

    },
    rules: {
      ...angularEslintTemplatePlugin.configs.recommended.rules, // Charger les règles HTML Angular recommandées
      'jsx-a11y/alt-text': 'warn', // Vérifie les balises nécessitant un texte alternatif (img, etc.)
      //'@angular-eslint/template/accessibility-elements-content': 'warn', // Vérifie le contenu des balises comme <button>
      //'@angular-eslint/template/accessibility-label-has-associated-control': 'warn', // Vérifie l'association des labels
      //'@angular-eslint/template/accessibility-table-scope': 'warn', // Vérifie les attributs scope pour <th>
      //'@angular-eslint/template/accessibility-valid-aria': 'warn', // Vérifie les attributs ARIA valides
      //'@angular-eslint/template/no-positive-tabindex': 'error', // Interdit les tabindex positifs

    },
  },
];
