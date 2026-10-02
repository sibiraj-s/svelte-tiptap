import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { svelteTesting } from '@testing-library/svelte/vite';

const dev = process.env.NODE_ENV === 'development';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      // Consult https://kit.svelte.dev/docs/integrations#preprocessors
      // for more information about preprocessors
      preprocess: [vitePreprocess()],

      // generate static site
      adapter: adapter({
        pages: 'build',
        assets: 'build',
        fallback: undefined,
        precompress: false,
      }),
      paths: { base: dev ? '' : '/svelte-tiptap' },
      appDir: 'core',
    }),
    svelteTesting(),
  ],
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['tests/setup.ts'],
  },
});
