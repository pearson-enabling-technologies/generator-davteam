'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var DavteamGenerator = module.exports = function DavteamGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DavteamGenerator, yeoman.generators.Base);

DavteamGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
  {
    name: 'projectName',
    message: 'What do you want to call your poject?'
  },
  {
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

DavteamGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');
  this.mkdir('app/scripts');
  this.mkdir('app/styles');
  this.mkdir('app/img');

  this.template('Gruntfile.js', 'Gruntfile.js');
  this.tempalte('index.html', 'app/index.html');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  
  this.copy('404.html', 'app/404.html');
};

DavteamGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
