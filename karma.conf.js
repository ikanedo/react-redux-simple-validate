/* global module */
module.exports = function (config) {
	var options = { cwd: '.' };
  var glob = require('glob');
  var specsToLoad = glob.sync('src/**/*Spec.js', options);
  var filesToLoad = glob.sync('src/**/!(*Spec).js', options);
  
	config.set({
		autoWatch: true,
		singleRun: true,
    basePath: '.',

    frameworks: ['jspm', 'jasmine-jquery', 'jasmine-ajax', 'jasmine', 'jasmine-matchers'],

		files: [
			'node_modules/babel-polyfill/dist/polyfill.js'
		],

		jspm: {
			config: 'config.js',
      packages: '/jspm_packages/',
			loadFiles: ['/jspm_packages/system-polyfills.js'].concat(specsToLoad, filesToLoad)
		},

		proxies: {
      '/src/': '/base/src/',
      '/base/jspm_packages/': '/jspm_packages/'
		},

		browsers: ['PhantomJS'],

		preprocessors: {
			'src/**/!(*Spec).js': ['babel', 'sourcemap', 'coverage']
		},

		babelPreprocessor: {
			options: {
				sourceMap: 'inline',
				presets: ['react', 'es2015']
			},
			sourceFileName: function(file) {
				return file.originalPath;
			}
		},

		reporters: ['progress', 'coverage'],

		coverageReporter: {
			instrumenters: {isparta: require('isparta')},
			instrumenter: {
				'src/**/!(*Spec).js': 'isparta'
			},

			reporters: [
				{
					type: 'text-summary',
					subdir: normalizationBrowserName
				},
				{
					type: 'html',
					dir: 'coverage/',
					subdir: normalizationBrowserName
				}
			]
		}
	});

	function normalizationBrowserName(browser) {
		return browser.toLowerCase().split(/[ /-]/)[0];
	}
};
