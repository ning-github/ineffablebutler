module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: { 
      css: {
        src: [
          "public/lib/angular-material.min.css", 
          "public/css/style.css"
          ],
        dest: "public/dist/style.css"
      },
      lib: {
        src: [
          "public/lib/angular.min.js",
          "public/lib/angular-route.min.js",
          "public/lib/angular-resource.min.js",
          "public/lib/angular-aria.min.js",
          "public/lib/angular-animate.min.js",
          "public/lib/angular-material.min.js",
          "public/lib/ng-map.min.js",
          ],
        dest: "public/dist/lib.js"
      },
      js: {
        src: [
          "public/js/app.js",
          "public/js/services/auth.js",
          "public/js/services/user.js",
          "public/js/services/autocomplete.js",
          "public/js/services/googleMaps.js",
          "public/js/services/bus.js",
          "public/js/controllers/LogController.js",
          "public/js/controllers/HomeController.js",
          "public/js/controllers/RoutesController.js"
          ],
        dest: "public/dist/javascript.js"
      }
    },

    cssmin: {
      css: {
        src: ["public/dist/style.css"],
        dest: "public/dist/style.css"
      }
    },

    uglify: {
      dist: {
        options: {
          mangle:false
        },
        src: ["public/dist/javascript.js"],
        dest: "public/dist/javascript.js"
      }
    },

    usemin: {
      html: "public/index.html",
      options: {
        blockReplacements: {
          less: function(block){
            return '<script src="'+block.dest+'"></script>';
          }
        }
      }
    },

    'string-replace': {
      config: {
        files: {
          'config/googleConfig.js': 'config/googleConfig.js',
        },
        options: {
          replacements: [
            {
              pattern: '189160676278-ci6rhq98n64ig2ekbb4ojst990u6tg6s.apps.googleusercontent.com',
              replacement: '706416071848-o2mii1b1r6th1hn5k4s4j6upkm5gm9l9.apps.googleusercontent.com'
            },
            {
              pattern: 'SkWnFwdTOG69OgDZi092hHqC',
              replacement: 'ooHjHT0yLXXrOPBwW97LdCKN'
            },
            {
              pattern: 'http://127.0.0.1:3000/auth/google/callback',
              replacement: 'https://munibutler.herokuapp.com/auth/google/callback'
            }
          ]
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-string-replace');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('default' , [
    'concat','cssmin','uglify'
  ]);

  grunt.registerTask('deploy' , [
    'usemin', 'string-replace'
  ]);

};
