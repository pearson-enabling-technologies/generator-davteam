/* global mocha, sinon, before, after, require, console */

(function() {

  'use strict';

  require.config({
    baseUrl : 'scripts',
    paths   : {
      spec                  : '../../spec',
      templates             : '../templates',
      // add your paths here
      jquery                : "../components/jquery/jquery",
      underscore            : "../components/underscore/underscore",
      backbone              : "../components/backbone/backbone",
      bridle                : "../components/bridle/dist/bridle",
      layoutmanager         : "../components/layoutmanager/backbone.layoutmanager",
      d3                    : "../components/d3/d3"
    },
    shim    : {
      backbone: {
        exports: 'Backbone',
        deps: ['jquery', 'underscore']
      },
      layoutmanager: {
        deps: ['jquery', 'backbone']
      },
      d3: {
        exports: 'd3'
      },
      underscore: {
        exports: '_'
      }
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
