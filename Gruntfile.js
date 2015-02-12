module.exports = function(grunt) {
	grunt.initConfig({
		concurrent: {
			dev: ['nodemon:dev'],
			options: {
				logConcurrentOutput: true
			}
		},
		nodemon: {
			dev: {
				script: 'app.js',
				options: {
					env: {
						'NODE_ENV': 'dev'
					},
					cwd: __dirname,
					watch: ['app/', 'routes/'],
					delay: 300,
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default',  ['concurrent:dev']);
	grunt.registerTask('run', ['concurrent:dev']);
};