'use strict';
module.exports = function (grunt) {

    grunt.config.set('exec', {
        coverage: {
            command: 'node ./node_modules/karma/bin/karma start karma.conf.js',
            stdout: true,
            stderr: true
        }
    });

    grunt.loadNpmTasks('grunt-exec');
};
