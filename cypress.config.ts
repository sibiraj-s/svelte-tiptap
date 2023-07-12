import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3009',
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
