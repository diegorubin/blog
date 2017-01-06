const Nightmare = require('nightmare'),
  config = require('../../config/application').tests;

Nightmare.action('errorMessagesLengthForField', function(selector, done) {
  this.evaluate_now(function(selector) {
    var parent = document.querySelector(selector).parentElement;
    return parent.querySelectorAll(".error-message").length;
  }, done, selector);
});

const integrationHelpers = {

  getUrl: (path) => {
    return `${config.endpoint}${path}`;
  },

  integrationContext: (testName, context, testFunction) => {

    context.screenshot = (name) => {
      const screenshotPath = config.integration.screenshotPath;
      const screenshotTestPath = `${process.cwd()}/${screenshotPath}/${testName}`;

      return `${screenshotTestPath}-${name}.png`;
    };

    try {
      testFunction(context, context.done);
    } catch (err) {
      console.error(err);
      context.done();
    }
  },

  startIntegrationContext: () => {
    const viewport = config.integration.viewport;
    return new Nightmare({show: config.integration.showNavigation})
      .viewport(viewport.width, viewport.height);
  }

};

module.exports = integrationHelpers;

