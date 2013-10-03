/* global mocha, sinon, before, after, require, console */

(function() {

  'use strict';

  require.config({
    baseUrl : 'scripts',
    paths   : {
      spec                  : '../../spec',
      templates             : '../templates'
      // add your paths here
    },
    shim    : {
      // add your shims here
    }
  });

  
  mocha.setup({
    globals : [
      // add any globals  here
    ]
  });

  

  // Require the tests
  require([
    'spec/app',
  ], function() {
    mocha.run();
  });
}());
