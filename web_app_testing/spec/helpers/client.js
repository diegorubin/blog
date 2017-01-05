'use strict';

const jsdom = require('jsdom');
const fs = require("fs");

const clientHelpers = {
  browserContext: (options, done, caseFunction) => {
    options = options || {};

    const scripts = [];
    const virtualConsole = jsdom.createVirtualConsole().sendTo(console);
    const html = fs.readFileSync(options.html, 'utf-8');

    options.scripts = options.scripts || [];
  
    for(let idx in options.scripts) {
      const script = options.scripts[idx];
      scripts.push(fs.readFileSync(script, 'utf-8'));
    }

    jsdom.env({
      html: html,
      src: scripts,
      virtualConsole: virtualConsole,
      created: (err, window) => {
        window.addEventListener("error", function (event) {
          console.error("script error!!", event.error);
        });
        if (err) {
          console.error(err.stack);
        }
      },
      done: (err, window) => {
        try {
          caseFunction(window, window.document, err);
          done();
        } catch (error) {
          console.error(error.stack);
          fail('error on execute script');
          done(error);
        }
      }

    })
  
  }
};

module.exports = clientHelpers; 

