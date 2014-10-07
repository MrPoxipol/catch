module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		watch: {
			scripts: {
				files: '**/*.js',
				options: {
					livereload: 1337
				}
			}
		}
		
		/*uglify: {
			
			css: {
				files: {
					
				}
			}
			
		}*/
	})
	
	grunt.registerTask('default', ['watch']);
};