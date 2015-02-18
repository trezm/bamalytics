require('angular/angular');
require('angular-route/angular-route');
require('d3/d3.min');

var app = angular
    .module('Bamalytics', [
			    'ngRoute',
			    'Bamalytics.Controllers',
			    'Bamalytics.Services'
			    ]);

angular.module('Bamalytics.Controllers', []);
angular.module('Bamalytics.Services', []);

app.config(
	[
	'$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/average_load', {
			templateUrl: 'average_load_page/average_load_page.html',
			controller: 'AverageLoadController'
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

// Services
require('./services');
