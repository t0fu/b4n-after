import antfu from '@antfu/eslint-config';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default antfu(
  {
    formatters: true,
    react: true,
    typescript: true,

    ignores: [
      '.github/**',
      '.vscode/**',
      'node_modules/**',
    ],

    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
      trailingComma: 'all',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      // Allow unused variables, as long as they start with an underscore
      'no-unused-vars': 'off',
      'unused-imports/no-unused-vars': 'off', // Handled by @typescript-eslint/no-unused-vars
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

            // Max line length of 120, but off for comments
      'max-len': ['warn', { code: 128, ignoreComments: true }],
      // Let me put list items on the same line
      'antfu/consistent-list-newline': 'off',
      // Let me do something like this: `if (a) return b;` all on one line
      'antfu/if-newline': 'off',
      // Let me do something like this: `case x: line; break;` all on one line
      'style/max-statements-per-line': 'warn',
      // Let me align end of line comments for better readability
      'style/no-multi-spaces': ['warn', { ignoreEOLComments: true }],
    },
  },
  // Legacy config
  ...compat.config({
    extends: [
      'plugin:sonarjs/recommended-legacy',
    ],
    rules: {
      'sonarjs/cognitive-complexity': 'warn',
      'sonarjs/fixme-tag': 'off',
      'sonarjs/max-switch-cases': 'warn',
      'sonarjs/no-commented-code': 'off',
      'sonarjs/no-dead-store': 'warn',
      'sonarjs/no-duplicated-branches': 'warn',
      'sonarjs/no-empty-test-file': 'warn',
      'sonarjs/no-ignored-exceptions': 'warn',
      'sonarjs/no-nested-functions': 'warn',
      'sonarjs/no-unused-vars': 'off',
      'sonarjs/prefer-promise-shorthand': 'warn',
      'sonarjs/pseudo-random': 'off',
      'sonarjs/todo-tag': 'off',
      'sonarjs/unused-import': 'off',
      'sonarjs/updated-loop-counter': 'warn',
    },
  }),
)
