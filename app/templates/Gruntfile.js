// Generated on 2013-03-22 using generator-webapp 0.1.5

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app  : 'app',
    dist : 'dist'
  };

  grunt.initConfig({
    yeoman        : yeomanConfig,
    watch         : {
      // recompile the coffeescript, test it and reload.
      // you'll get a nice BEEP if the tests don't pass.
      coffee     : {
        files : ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks : ['coffee:dist', 'mocha'],
        options: {
          livereload: true
        }
      },
      // run jshint, reload
      jshint     : {
        files : [
          'test/{,*/}*.js',
          'Gruntfile.js'
        ],
        tasks : ['jshint']
      },
      // recompile, run tests and reload
      jst        : {
        files : ['<%= yeoman.app %>/templates/{,*/}*.html'],
        tasks : ['jst', 'mocha'],
        options: {
          livereload: true
        }
      },
      // recompile and reload if you change the scss
      compass    : {
        files : ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks : ['compass:server'],
        options: {
          livereload: true
        }
      },
      // run the tests if they change
      test : {
        files : ['test/{,*/}*.{js,html}'],
        tasks : ['mocha'],
        options: {
          livereload: true
        }
      },
      // basically just reload here if anything else changes
      otherFiles : {
        files : [
          '<%= yeoman.app %>/*.html',
          '<%= yeoman.app %>/img/{,*/}*.{png,gif,jpg,jpeg,webp}'
        ],
        options: {
          livereload: true,
        },
      }
    },
    connect       : {
      options    : {
        port     : 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname : '0.0.0.0'
      },
      livereload : {
        options : {
          middleware : function(connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'app')
            ];
          }
        }
      },
      test       : {
        options : {
          middleware : function(connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, 'app')
            ];
          },
          port       : 9001
        }
      },
      dist       : {
        options : {
          middleware : function(connect) {
            return [
              mountFolder(connect, 'dist')
            ];
          }
        }
      }
    },
    open          : {
      server : {
        path : 'http://localhost:<%= connect.options.port %>'
      },
      test   : {
        path : 'http://localhost:<%= connect.test.options.port %>'
      }
    },
    clean         : {
      dist   : ['.tmp', '<%= yeoman.dist %>/*'],
      server : '.tmp'
    },
    jshint        : {
      options : {
        jshintrc : '.jshintrc'
      }
    },
    mocha         : {
      all : {
        options : {
          run  : false, // set to false to wait for require
          urls : ['http://localhost:<%= connect.test.options.port %>/index.html'],
        }
      }
    },
    coffee        : {
      dist : {
        files : [
          {
            // rather than compiling multiple files here you should
            // require them into your main .coffee file
            expand : true,
            cwd    : '<%= yeoman.app %>/scripts',
            src    : '{,*/}*.coffee',
            dest   : '.tmp/scripts',
            ext    : '.js'
          }
        ]
      }
    },
    compass       : {
      options : {
        sassDir        : '<%= yeoman.app %>/styles',
        cssDir         : '.tmp/styles',
        imagesDir      : '<%= yeoman.app %>/img',
        javascriptsDir : '<%= yeoman.app %>/scripts',
        fontsDir       : '<%= yeoman.app %>/styles/fonts',
        importPath     : '<%= yeoman.app %>/components',
        relativeAssets : true
      },
      dist    : {},
      server  : {
        options : {
          debugInfo : true
        }
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
     dist: {}
     },*/
    requirejs     : {
      dist : {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options : {
          // `name` and `out` is set by grunt-usemin
          baseUrl                 : '.tmp/scripts',
          optimize                : 'none',
          // TODO: Figure out how to make sourcemaps work with grunt-usemin
          // https://github.com/yeoman/grunt-usemin/issues/30
          //generateSourceMaps: true,
          // required to support SourceMaps
          // http://requirejs.org/docs/errors.html#sourcemapcomments
          preserveLicenseComments : false,
          useStrict               : true,
          wrap                    : true,
          //uglify2: {} // https://github.com/mishoo/UglifyJS2
        }
      }
    },
    useminPrepare : {
      html    : '<%= yeoman.app %>/index.html',
      options : {
        dest : '<%= yeoman.dist %>'
      }
    },
    usemin        : {
      html    : ['<%= yeoman.dist %>/{,*/}*.html'],
      css     : ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options : {
        dirs : ['<%= yeoman.dist %>']
      }
    },
    imagemin      : {
      dist : {
        files : [
          {
            expand : true,
            cwd    : '<%= yeoman.app %>/img',
            src    : '{,*/}*.{png,jpg,jpeg}',
            dest   : '<%= yeoman.dist %>/img'
          }
        ]
      }
    },
    cssmin        : {
      dist : {
        files : {
          '<%= yeoman.dist %>/styles/main.css' : [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin       : {
      dist : {
        options : {
          /*removeCommentsFromCDATA: true,
           // https://github.com/yeoman/grunt-usemin/issues/44
           //collapseWhitespace: true,
           collapseBooleanAttributes: true,
           removeAttributeQuotes: true,
           removeRedundantAttributes: true,
           useShortDoctype: true,
           removeEmptyAttributes: true,
           removeOptionalTags: true*/
        },
        files   : [
          {
            expand : true,
            cwd    : '<%= yeoman.app %>',
            src    : '*.html',
            dest   : '<%= yeoman.dist %>'
          }
        ]
      }
    },
    copy          : {
      // we need to copy the components so that requirejs can build itself
      components : {
        files : [
          {
            expand : true,
            dot    : true,
            cwd    : '<%= yeoman.app %>',
            dest   : '.tmp',
            src    : [
              '*.json',
              'components/{,*/}{,*/}*.js',
              'scripts/vendor/{,*/}{,*/}*.js'
            ]
          }
        ]
      },
      // we also need the plugins inside vendor which don't get re-generated by
      // coffee
      vendor     : {
        files : [
          {
            expand : true,
            dot    : true,
            cwd    : '<%= yeoman.app %>',
            dest   : '.tmp',
            src    : ['scripts/vendor/{,*/}{,*/}*.js']
          }
        ]
      },
      dist       : {
        files : [
          {
            expand : true,
            dot    : true,
            cwd    : '<%= yeoman.app %>',
            dest   : '<%= yeoman.dist %>',
            src    : [
              '*.{ico,txt,json}',
              'templates/{,*/}*.html',
              'styles/fonts/*',
              'scripts/vendor/*.swf',
              '.htaccess'
            ]
          }
        ]
      }
    },
    bower         : {
      all : {
        rjsConfig : '<%= yeoman.app %>/scripts/main.js'
      }
    },
    jst           : {
      dist : {
        files   : [
          {
            expand : true,
            cwd    : '<%= yeoman.app %>/templates',
            src    : '{,*/}*.html',
            dest   : '.tmp/templates',
            ext    : '.js'
          }
        ],
        options : {
          amd : true
        }
      }
    }
  });

  grunt.registerTask('server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'coffee:dist',
      'jst',
      'compass:server',
      'connect:test',
      'connect:livereload',
      'open:server'
    ]);

    // to run tests, the `test` target has to be specified, ie. `server:test`,
    // otherwise we run without tests - to do that, we have to filter out the test specific tasks from the config for
    // the `watch` task
    var watchConfig = grunt.config('watch');
    if (target !== 'test') {
      var filterTests = function(taskName) {
        return !(/(mocha)/).test(taskName);
      };
      for (var configName in watchConfig) {
        if (watchConfig.hasOwnProperty(configName) && watchConfig[configName].hasOwnProperty('tasks')) {
          watchConfig[configName].tasks = watchConfig[configName].tasks.filter(filterTests);
        }
      }
      delete watchConfig.test;
    }
    else {
      grunt.task.run('connect:test');
    }
    grunt.config('watch', watchConfig);
    grunt.task.run('watch');
  });

  grunt.registerTask('test', function(target) {
    target = target || 'phantom';

    var tasks = [
      'clean:server',
      'coffee',
      'jst',
      'compass:server',
      'connect:test',
    ];

    if (target === 'browser') {
      tasks.push('open:test');
    }
    if (target === 'phantom') {
      tasks.push('mocha');
    }
    if (target !== 'dist') { //don't want files to be watched when we're only building for dist
      tasks.push('watch');
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('build', [
    'test:dist', // ADDED TEST HERE. YOU WON'T BE ABLE TO BUILD IF TESTS FAIL. DON'T YOU DARE COMMENTING THIS LINE OUT
    'jshint',
    'clean:dist',
    'coffee',
    'jst',
    'compass:dist',
    'useminPrepare',
    'copy:components',
    'requirejs',
    'imagemin',
    'htmlmin',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
