// @ts-check
import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // generate static site
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      precompress: false,
    }),

    paths: {
      base: dev ? '' : '/svelte-tiptap',
    },

    appDir: 'core',
  },
};

export default config;
