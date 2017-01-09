const application = {
  gateway: {
    createUserApi: 'http://localhost:4567/users'
  },
  server: {
    port: process.env.PORT || 5000
  },
  tests: {
    caseTimeout: 10000,
    endpoint: 'http://localhost:5000',
    integration: {
      showNavigation: true,
      viewport: {
        width: 1306,
        height: 768
      }
    }
  }
};

module.exports = application;

