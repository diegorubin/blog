const browserContext = require('../../../spec/helpers/client').browserContext;

const contextOptions = {
  scripts: [
    './app/public/javascripts/components/validator.js',
    './app/public/javascripts/components/notification.js',
    './app/public/javascripts/forms/user.js'
  ]
};

describe('FormValidator', () => {

  describe('call notification after submit fail because invalid data', () => {

    it('return false if incorrect email', (done) => {
      contextOptions.html = './spec/client/fixtures/forms/user.html';
      browserContext(contextOptions, done, (window, document) => {
        var userForm = new window.UserForm();
        userForm.init('user');

        spyOn(userForm.notification, 'showErrors');
        document.getElementById('user').onsubmit();

        expect(userForm.notification.showErrors).toHaveBeenCalledWith(userForm.validator.errors);
      });
    });

  });

});

