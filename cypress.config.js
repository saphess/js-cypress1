const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const device = config.env.device || "desktop";

      if (device === "mobile") {
        config.viewportWidth = 375;
        config.viewportHeight = 667;
      } else if (device === "desktop") {
        config.viewportWidth = 1366;
        config.viewportHeight = 768;
      }

      return config;
    },

    baseUrl: "http://localhost:3000/",
  },
});
