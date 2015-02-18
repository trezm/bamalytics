module.exports = function(grunt) {
	grunt.initConfig({
	    concurrent: {
		dev: ['nodemon:dev', 'watch'],
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
	    },
	    watch: {
		web: {
		    files: ['web/**/*.js', 'web/**/*.css', 'web/**/*.html'],
		    tasks: ['default']
		},
//		appjs: {
//		    files: ['app/**/*.js', 'routes/**/*.js'],
//		    tasks: ['nodemon:dev']
//		}
	    },
	    browserify: {
		js: {
		    src: 'web/app.js',
		    dest: 'dist/app.js'
		},
	    },
	    copy: {
		all: {
		    expand: true,
		    cwd: 'web/',
		    src: ['**/*.html', '**/*.jpg', '**/*.png'],
		    dest: 'dist/'
		}
	    },
	    cssmin: {
		minify_and_combine: {
		    files: {
			'dist/bootsolesjs.min.css': [
			    'node_modules/bootstrap/dist/css/bootstrap.min.css', // Bootstrap
			    'web/**/*.css' // General CSS
			]
		    }
		}
	    }
	});
    
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    
    grunt.registerTask('default', ['browserify', 'copy', 'cssmin']);
    grunt.registerTask('build', ['browserify', 'copy', 'cssmin']);
    grunt.registerTask('run', ['build', 'concurrent:dev']);
    grunt.registerTask('heroku', ['browserify', 'copy', 'cssmin']);
};
