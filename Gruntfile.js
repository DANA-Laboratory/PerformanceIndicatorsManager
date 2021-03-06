'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    env: {
      dev : {
        NODE_ENV : 'development'
      },
      test : {
        NODE_ENV : 'test'
      },
      prod : {
        NODE_ENV : 'production'
      }
    },
    mochaTest: {
     all: {
       options: {
         reporter: 'spec',
         captureFile: 'results.txt', // Optionally capture the reporter output to a file
         quiet: false, // Optionally suppress output to standard out (defaults to false)
         clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
         noFail: false, // Optionally set to not fail on failed tests (will still fail on other errors)
         bail: true
       },
       src: ['test/**/*.js']
     },
     restful: {
       options: {
         reporter: 'spec',
         captureFile: 'results.txt', // Optionally capture the reporter output to a file
         quiet: false, // Optionally suppress output to standard out (defaults to false)
         clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
         noFail: false, // Optionally set to not fail on failed tests (will still fail on other errors)
         bail: true
       },
       src: ['test/restful.js']
     }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'mochaTest']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'mochaTest']
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Default task.
  grunt.registerTask('default', ['env:test', 'jshint', 'mochaTest']);
  grunt.registerTask('test', ['env:test', 'mochaTest']);
  grunt.registerTask('subtest', ['env:test', 'mochaTest:restful']);
};
