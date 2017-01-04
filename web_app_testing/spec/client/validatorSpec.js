const browserContext = require('../../spec/helpers/client').browserContext;

const contextOptions = {
  scripts: ['./app/public/javascripts/validator.js']
};

describe('FormValidator', () => {

  describe('validate email field', () => {

    it('return false if incorrect email', (done) => {
      contextOptions.html = './spec/client/fixtures/validator/email-invalid.html';
      browserContext(contextOptions, done, (window, document) => {
        var formValidator = new window.FormValidator();
        formValidator.init('email-invalid');
        expect(formValidator.isValid()).toBe(false);
      });
    });

  });

});

