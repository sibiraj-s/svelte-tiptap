import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3009',
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) { // eslint-disable-line  @typescript-eslint/no-unused-vars
      // implement node event listeners here
    },
  },
});
