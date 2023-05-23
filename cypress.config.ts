import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    experimentalStudio: true,
  },
  viewportWidth: 1280,
  viewportHeight: 768,
  watchForFileChanges: false,
});
