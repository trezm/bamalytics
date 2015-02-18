var _ = require('underscore/underscore-min.js');
var d3 = require('d3/d3.min.js');

angular.module('Bamalytics.Controllers')
	.controller('AverageLoadController', ['$scope', 'AverageLoadService', function($scope, AverageLoadService) {
		$scope.svg;
		var _renderGraph = function() {
		var graphDiv = d3.select('#graph');

	// Set the dimensions of the canvas / graph
	var margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = graphDiv[0][0].clientWidth - margin.left - margin.right,
	height = 270 - margin.top - margin.bottom;

	// Set the ranges
	var x = d3.time.scale().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);

	// Define the axes
	var xAxis = d3.svg.axis().scale(x)
	    .orient("bottom").ticks(5);

	var yAxis = d3.svg.axis().scale(y)
	    .orient("left").ticks(5);

	// Define the line
	var valueline = d3.svg.line()
    	.x(function(d) { return x(d[$scope.xKey]); })
        .y(function(d) { return y(d[$scope.yKey]); });
    
	// Adds the svg canvas
	if (!$scope.svg) {
		var svg = graphDiv
		.append("svg")
		.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");		
	} else {
		svg = $scope.svg;
	}

    var xDomain = d3.extent($scope.results, function(d) { return d[$scope.xKey]; });
    var yDomain = [0, d3.max($scope.results, function(d) { return d[$scope.yKey]; })];

    x.domain(xDomain);
    y.domain(yDomain);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline($scope.results));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
        $scope.svg = svg;
		}

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
							_renderGraph();
						} else if ($scope.targetField.length > 0) {
							// Should bucketize here
							$scope.results = _retrieveValues(results);
						} else {
							$scope.results = _retrieveValues(results);							
						}
					}
					$scope.resultKeys = Object.keys($scope.results);
				}
			});
		}

		$scope.xKey = '';
		$scope.xValues = [];
		$scope.yKey = '';
		$scope.yValues = [];
		$scope.results = [];
		$scope.resultKeys = [];
		$scope.targetField = '';
		$scope.queryString = '';
		$scope.submitQuery = submitQuery;
	}
	]);