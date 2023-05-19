const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:2368/ghost/",
    env: {
      username: "c.ramirezr2@uniandes.edu.co",
      password: "contraseña",
      userghost: "ghost-author@example.com",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
