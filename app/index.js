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
    message: 'What do you want to call your project?'
  },
  {
    name: 'projectDescription',
    message: 'Describe your project in a few words'
  }
  ];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.projectDescription = props.projectDescription;


    cb();
  }.bind(this));
};

DavteamGenerator.prototype.app = function app() {
  // create the directories
  this.mkdir('app');
  this.mkdir('app/templates');
  this.mkdir('app/scripts');
  this.mkdir('app/scripts/modules');
  this.mkdir('app/styles');
  this.mkdir('app/img');

  // create the templated files
  this.template('index.html', 'app/index.html');
  this.template('templates/layouts/index.html', 'app/templates/layouts/index.html');
  // create simple app files
  this.copy('scripts/app.coffee', 'app/scripts/app.coffee');
  this.copy('scripts/main.coffee', 'app/scripts/main.coffee');
  this.copy('scripts/router.coffee', 'app/scripts/router.coffee');
  this.copy('scripts/modules/index.coffee', 'app/scripts/modules/index.coffee');

  // style files
  this.copy('styles/main.scss', 'app/styles/main.scss');

  // create the robots, 404 etc
  this.copy('404.html', 'app/404.html');
  this.copy('robots.txt', 'app/robots.txt')
};

DavteamGenerator.prototype.test = function app() {
  // create the scaffolding
  this.mkdir('test');
  this.mkdir('test/spec');

  // copy the test
  this.copy('test/index.html', 'test/index.html');
  this.copy('test/specRunner.js', 'test/specRunner.js');
  this.copy('test/spec/app.js', 'test/spec/app.js');
  
}

DavteamGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');

  this.template('_README.md', 'README.md')

  // copy the next of the things
  this.copy('_changelog.md', 'changelog.md')
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('npmignore', '.npmignore');
};
