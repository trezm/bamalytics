angular.module('Bamalytics.Controllers')
	.controller('AverageLoadController', ['$scope', 'AverageLoadService', function($scope, AverageLoadService) {
		var submitQuery = function() {
			console.log('making query');
			AverageLoadService.query($scope.queryString, function(error, results) {
				if (error) {
					alert('ERROR:', error);
				} else {
					if (typeof results === 'string') {
						$scope.results = JSON.parse(results);
					} else {
						$scope.results = results;
					}
					$scope.resultKeys = Object.keys($scope.results);
				}
			});
		}

		$scope.results = [];
		$scope.resultKeys = [];
		$scope.submitQuery = submitQuery;
	}
	]);