require('angular/angular');
require('angular-route/angular-route');
require('d3/d3.min');

var app = angular
    .module('Bamalytics', [
			    'ngRoute',
			    'Bamalytics.Controllers',
			    'Bamalytics.Services',
			    'Bamalytics.Directives'
			    ]);

angular.module('Bamalytics.Controllers', []);
angular.module('Bamalytics.Services', []);
angular.module('Bamalytics.Directives', []);

app.config(
	[
	'$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/average_load', {
			templateUrl: 'average_load_page/average_load_page.html',
			controller: 'AverageLoadController',
			reloadOnSearch: false
		});
		$routeProvider.when('/time_graph', {
			templateUrl: 'time_graph/time_graph_page.html',
			controller: 'TimeGraphController',
			reloadOnSearch: false			
		});
		$routeProvider.when('/', {
			templateUrl: 'landing_page/landing_page.html'
		});
		$routeProvider.otherwise({
			redirectTo: '/'
		});
	}
	]
);
	
// Controllers
require('./menu_bar/menu_bar_controller')(app);
require('./footer/footer_controller')(app);
require('./average_load_page/average_load_controller');
require('./time_graph/time_graph_controller');

// Services
require('./services');

// Directives
require('./directives');
