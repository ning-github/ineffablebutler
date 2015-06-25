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
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('default' , [
    'concat', 'cssmin'
  ]);
};
