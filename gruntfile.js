'use strict';

var config = require('./config/config');

module.exports = function (grunt) {

    require('time-grunt')(grunt);

    // Unified Watch Object
    var watchFiles = {
        serverViews: ['server/views/**/*.*'],
        serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'server/**/*.js'],
        clientViews: ['public/modules/**/views/**/*.html'],
        clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
        clientCSS: ['public/modules/**/*.css'],
        mochaTests: ['server/tests/**/*.js'],
        vendors: config.assets.lib.js,
        jsBuildFiles: config.assets.js
    };

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            serverViews: {
                files: watchFiles.serverViews,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: watchFiles.serverJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: watchFiles.clientViews,
                tasks: ['ngtemplates'],
                options: {
                    livereload: true
                }
            },
            clientJS: {
                files: watchFiles.clientJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientCSS: {
                files: watchFiles.clientCSS,
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: watchFiles.clientJS.concat(watchFiles.serverJS),
                options: {
                    jshintrc: true
                }
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: watchFiles.clientCSS
            }
        },
        uglify: {
            development: {
                options: {
                    mangle: false
                },
                files: {
                    'public/generated/application.min.js': 'public/generated/application.js',
                    'public/generated/vendor.min.js': 'public/generated/vendor.js'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'public/dist/eventa.min.css': '<%= applicationCSSFiles %>'
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: watchFiles.serverViews.concat(watchFiles.serverJS)
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 50,
                    'hidden': []
                }
            }
        },
        ngAnnotate: {
            development: {
                files: {
                    'public/generated/application.js': watchFiles.jsBuildFiles,
                    'public/generated/vendor.js': watchFiles.vendors
                }
            }
        },
        ngtemplates: {
            app: {
                src: watchFiles.clientViews[0],
                dest: 'public/generated/template.js',
                options: {
                    base: './public',
                    htmlmin: {
                        collapseWhitespace: true,
                        removeComments: true
                    }
                }
            }
        },
        concat: {
            js: {
                files: {
                    'public/dist/eventa.min.js': ['public/generated/vendor.min.js', 'public/generated/application.min.js']
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true
            }
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        mochaTest: {
            src: watchFiles.mochaTests,
            options: {
                reporter: 'spec',
                require: 'server.js'
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    // Load NPM tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('tasks');

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // A Task for loading the configuration object
    grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function () {
        var init = require('./config/init')();
        var config = require('./config/config');

        grunt.config.set('applicationJavaScriptFiles', config.assets.js);
        grunt.config.set('applicationCSSFiles', config.assets.lib.css.concat(config.assets.css));
    });

    // Default task(s).
    grunt.registerTask('default', ['lint', 'concurrent:default']);

    // Debug task.
    grunt.registerTask('debug', ['lint', 'concurrent:debug']);

    // Lint task(s).
    grunt.registerTask('lint', ['jshint', 'csslint']);

    // Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

    // Build task(s).
    switch (process.env.NODE_ENV) {
        case 'development':
            grunt.registerTask('build', ['lint', 'loadConfig', 'ngtemplates', 'ngAnnotate', 'uglify', 'cssmin', 'concat']);
            break;
        default:
            grunt.registerTask('build', ['lint', 'loadConfig']);
    }

};
