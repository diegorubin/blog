const browserContext = require('../../../spec/helpers/client').browserContext;

const contextOptions = {
  scripts: ['./app/public/javascripts/components/validator.js']
};

describe('FormValidator', () => {

  describe('validate email field', () => {

    it('return false if incorrect email', (done) => {
      contextOptions.html = './spec/client/fixtures/validator/email-invalid.html';
      browserContext(contextOptions, done, (window, document) => {
        var formValidator = new window.FormValidator();
        formValidator.init('user');
        expect(formValidator.isValid()).toBe(false);
      });
    });

    it('return true if correct email', (done) => {
      contextOptions.html = './spec/client/fixtures/validator/email-valid.html';
      browserContext(contextOptions, done, (window, document) => {
        var formValidator = new window.FormValidator();
        formValidator.init('user');
        expect(formValidator.isValid()).toBe(true);
      });
    });

    it('return email invalid in list of errors', (done) => {
      contextOptions.html = './spec/client/fixtures/validator/email-invalid.html';
      browserContext(contextOptions, done, (window, document) => {
        var formValidator = new window.FormValidator();
        formValidator.init('user');
        formValidator.isValid();
        expect(formValidator.errors).toEqual({'email': ['email.invalid']});
      });
    });
  });

  describe('validate password confirmation field', () => {

    it('return false if password confirmation is correct', (done) => {
      contextOptions.html = './spec/client/fixtures/validator/password-confirmation-invalid.html';
      browserContext(contextOptions, done, (window, document) => {
        var formValidator = new window.FormValidator();
        formValidator.init('user');
        expect(formValidator.isValid()).toBe(false);
      });
    });

    it('return confirmation invalid in list of errors', (done) => {
      contextOptions.html = './spec/client/fixtures/validator/password-confirmation-invalid.html';
      browserContext(contextOptions, done, (window, document) => {
        var formValidator = new window.FormValidator();
        formValidator.init('user');
        formValidator.isValid();
        expect(formValidator.errors).toEqual({'password-confirmation': ['confirmation.notEqual']});
      });
    });
  });

  describe('not submit form with errors', () => {

    it('call isValid method', (done) => {
      contextOptions.html = './spec/client/fixtures/validator/email-invalid.html';
      browserContext(contextOptions, done, (window, document) => {
        var formValidator = new window.FormValidator();
        formValidator.init('user');

        spyOn(formValidator, 'isValid');
        document.getElementById('user').onsubmit();

        expect(formValidator.isValid).toHaveBeenCalled();
      });

    });

    it('call custom callback if submit fail', (done) => {
      contextOptions.html = './spec/client/fixtures/validator/email-invalid.html';
      browserContext(contextOptions, done, (window, document) => {
        var formValidator = new window.FormValidator();
        var callback = jasmine.createSpy("callback");
        formValidator.init('user', callback);

        document.getElementById('user').onsubmit();

        expect(callback).toHaveBeenCalled();
      });

    });
  });
});

