const { defineConfig } = require("cypress");
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  reporter: '../node_modules/cypress-mochawesome-reporter',
  video: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  reporterOptions: {
      reportDir: 'reports/mochawesome',
  },
  e2e: {

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });
    },
  },
});