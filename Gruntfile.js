module.exports = function(grunt) {
	grunt.initConfig({
		cssmin: {
			build: {
				files: {
					'public/style/dist/album.min.css': 'public/style/album.css',
					'public/style/dist/home.min.css': 'public/style/home.css',
					'public/style/dist/reset.min.css': 'public/style/reset.css',
					'public/style/dist/slideshow.min.css': 'public/style/slideshow.css'
				}
			}
		},
		uglify: {
			build: {
				files: {
					'public/js/dist/fileUpload.min.js': 'public/js/fileUpload.js',
					'public/js/dist/imageHelper.min.js': 'public/js/imageHelper.js',
					'public/js/dist/jquery.lazyload.min.js': 'public/js/jquery.lazyload.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('production', ['cssmin', 'uglify']);
};
