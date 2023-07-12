import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['tests/setup.ts'],
    alias: [
      {
        // @fixme
        // see https://github.com/testing-library/svelte-testing-library/issues/222
        find: /^svelte$/,
        replacement: 'svelte/internal',
      },
    ],
  },
});
