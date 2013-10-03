/* global describe, define, it */

define(['app'], function(app) {
  'use strict';

  describe('App', function() {
    it('Should be an app', function() {
      app.should.not.be.undefined;
    });
  });
   
});
