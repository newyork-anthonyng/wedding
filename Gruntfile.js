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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
};
