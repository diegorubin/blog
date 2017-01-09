'use strict';

const integrationHelpers = require('../helpers/integration'),
  integrationContext = integrationHelpers.integrationContext,
  startIntegrationContext = integrationHelpers.startIntegrationContext,
  getUrl = integrationHelpers.getUrl,
  config = require('../../config/application'),
  nock = require('nock');

describe('create users', () => {

  let context;

  beforeEach(() => {
    require('../../app');
    context = startIntegrationContext();
  });

  it('not save if email is invalid', (done) => {
    integrationContext('', {done: done}, (testContext, done) => {
      context
        .goto(getUrl('/users/new'))
        .type('[name=email]', 'email@invalid')
        .click('[type=submit]')
        .evaluate((selector) => {
          return document.querySelector(selector).innerText;
        }, '#email-error')
        .then((text) => {
          expect(text).toEqual('email.invalid');
          done();
        });
    });
  }, config.tests.caseTimeout);

  it('not save if password confirmation is wrong', (done) => {
    integrationContext('', {done: done}, (testContext, done) => {
      context
        .goto(getUrl('/users/new'))
        .type('[name=password]', '12345')
        .type('[name=password_confirmation]', '123456')
        .click('[type=submit]')
        .evaluate((selector) => {
          return document.querySelector(selector).innerText;
        }, '#password_confirmation-error')
        .then((text) => {
          expect(text).toEqual('confirmation.notEqual');
          done();
        });
    });
  }, config.tests.caseTimeout); 

  it('save valid user', (done) => {

    nock('http://localhost:4567')
     .post('/users')
     .reply(201, {
       message: 'user.created'
      });

    integrationContext('', {done: done}, (testContext, done) => {
      context
        .goto(getUrl('/users/new'))
        .type('[name=username]', 'user')
        .type('[name=email]', 'email@example.com')
        .type('[name=password]', '123456')
        .type('[name=password_confirmation]', '123456')
        .click('[type=submit]')
        .wait(500)
        .evaluate((selector) => {
          return document.querySelector(selector).innerText;
        }, '.alert')
        .then((text) => {
          expect(text).toEqual('user.created');
          done();
        });
    });
  }, config.tests.caseTimeout);

  it('not save duplicated user', (done) => {

    nock('http://localhost:4567')
     .post('/users')
     .reply(201, {
       message: 'user.duplicated'
      });

    integrationContext('', {done: done}, (testContext, done) => {
      context
        .goto(getUrl('/users/new'))
        .type('[name=username]', 'user')
        .type('[name=email]', 'email@example.com')
        .type('[name=password]', '123456')
        .type('[name=password_confirmation]', '123456')
        .click('[type=submit]')
        .wait(500)
        .evaluate((selector) => {
          return document.querySelector(selector).innerText;
        }, '.alert')
        .then((text) => {
          expect(text).toEqual('user.duplicated');
          done();
        });
    });
  }, config.tests.caseTimeout);

});

