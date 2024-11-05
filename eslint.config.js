import pegasus from 'eslint-config-pegasus';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser';

import svelteConfig from './svelte.config.js';

/** @type {import("eslint").Linter.Config[]} */
const config = pegasus.tsConfig(
  {
    ignores: ['build/', '.svelte-kit/', 'dist/'],
  },
  pegasus.configs.default,
  pegasus.configs.node,
  pegasus.configs.browser,
  prettier,
  {
    files: ['*.ts'],
    extends: pegasus.configs.typescriptRecommended,
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    name: 'overrides',
    rules: {
      'no-duplicate-imports': 'off',
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts'],
    extends: [
      ...pegasus.configs.typescript,
      ...svelte.configs['flat/recommended'],
      prettier,
      ...svelte.configs['flat/prettier'],
    ],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.svelte'],
        ...svelteConfig,
      },
    },
  },
);

export default config;
