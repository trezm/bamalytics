var _ = require('underscore/underscore-min.js');

angular.module('Bamalytics.Controllers')
	.controller('AverageLoadController', ['$scope', '$location', 'AverageLoadService', function($scope, $location, AverageLoadService) {
		var _retrieveValues = function(inputValues, field) {
			if ($scope.targetField != '') {
				return _.map(inputValues, function(input) {
					return JSON.parse(input)[field];
				});
			} else {
				return inputValues;
			}
		}

		var _parseValues = function(inputValues) {
			return _.map(inputValues, function(input) {
				return JSON.parse(input);
			});
		}

		var submitQuery = function() {
			console.log('making query');
			AverageLoadService.query($scope.queryString, function(error, results) {
				if (error) {
					alert('ERROR:', error);
				} else {
					if (typeof results === 'string') {
						$scope.results = JSON.parse(results);
					} else {
						if ($scope.targetField.indexOf(',') > -1) {
							var pair = $scope.targetField.replace(/\s+/g, '').split(',');
							$scope.xKey = pair[0];
							$scope.yKey = pair[1];
							$scope.results = _parseValues(results);
						} else if ($scope.targetField.length > 0) {
							// Should bucketize here
							$scope.results = _retrieveValues(results);
						} else {
							$scope.results = _retrieveValues(results);							
						}
					}
					$scope.resultKeys = Object.keys($scope.results);
					$location.search('targetField', $scope.targetField);
					$location.search('queryString', $scope.queryString);
				}
			});
		}

		$scope.xKey = '';
		$scope.xValues = [];
		$scope.yKey = '';
		$scope.yValues = [];
		$scope.results = [];
		$scope.resultKeys = [];
		$scope.targetField = $location.search().targetField ? $location.search().targetField : '';
		$scope.queryString = $location.search().queryString ? $location.search().queryString : '';
		$scope.submitQuery = submitQuery;
	}
	]);