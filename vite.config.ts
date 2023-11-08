import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  // @fixme
  // see https://github.com/testing-library/svelte-testing-library/issues/222
  resolve: {
    ...(process.env.VITEST
      ? {
          conditions: ['default', 'module', 'import', 'browser'],
        }
      : null),
  },
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['tests/setup.ts'],
  },
});
