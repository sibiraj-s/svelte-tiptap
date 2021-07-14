import App from './App.svelte';

import './global.scss';

const app = new App({
  target: document.body,
  props: {
    name: 'tiptap',
  },
});

export default app;
