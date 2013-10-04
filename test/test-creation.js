/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('davteam generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('davteam:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // Project Files
      '.jshintrc',
      '.editorconfig',
      '.gitignore',
      '.npmignore',
      'changelog.md',
      'README.md',
      'package.json',
      'bower.json',
      '.bowerrc',
      'Gruntfile.js',

      // test
      'test/index.html',
      'test/specRunner.js',
      'test/spec/app.js',

      // app files
      'app/index.html',
      'app/scripts/app.coffee',
      'app/scripts/main.coffee',
      'app/scripts/router.coffee',
      'app/scripts/modules/index.coffee',
      'app/404.html',
      'app/robots.txt',
      'app/styles/main.scss',
      'app/templates/layouts/index.html'

    ];

    helpers.mockPrompt(this.app, {
      'projectName': 'someProject',
      'projectDescription': 'someDescription'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
