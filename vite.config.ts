import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [sveltekit()],
  test: {
    environment: 'happy-dom',
    include: [
      'tests/**/*.{test,spec}.{js,ts}',
    ],
    setupFiles: ['tests/setup.ts'],
  },
};

export default config;
