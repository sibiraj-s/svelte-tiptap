import svelte from 'rollup-plugin-svelte';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';

import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'lib/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: production,
    },
  ],
  external: ['svelte', '@tiptap/core', '@tiptap/extension-bubble-menu', '@tiptap/extension-floating-menu'],
  plugins: [
    svelte({
      preprocess: sveltePreprocess({ sourceMap: production }),
      compilerOptions: {
        dev: !production,
      },
    }),
    typescript({
      sourceMap: production,
    }),
    resolve({
      browser: true,
      dedupe: [
        'svelte',
      ],
    }),
  ],
};
