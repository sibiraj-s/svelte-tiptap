import { sveltekit } from '@sveltejs/kit/vite';
import { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [sveltekit()],
};

export default config;
