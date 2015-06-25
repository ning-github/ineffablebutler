module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    useminPrepare: {
      html: "public/index.html"
    },
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
          "public/lib/*.js",
          ],
        dest: "public/dist/lib.js"
      },
      js: {
        src: [
          "public/js/**/*.js"
          ],
        
        dest: "public/dist/js.js"
      }
    },

    cssmin: {
      pub: {
        src: "public/dist/style.css",
        dest: "public/dist/style.css"
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
    'useminPrepare','concat', 'cssmin', 'usemin'
  ]);
};
