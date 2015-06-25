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
          "public/js/services/fiveEleven.js",
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
        src: ["public/dist/javascript.js"],
        dest: "public/dist/javascript.js"
      },
      lib: {
        files: {
          "public/lib/angular-route.min.js": ["public/lib/angular-route.js"],
          "public/lib/angular-resource.min.js": ["public/lib/angular-resource.js"]
        }
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
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('default' , [
    'concat','uglify:dist','cssmin','usemin'
  ]);
};
