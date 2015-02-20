var d3 = require('d3/d3.min.js');

angular.module('Bamalytics.Directives')
	.directive('lineGraph', function() {
		return {
			restrict: 'E',
			scope: {
				data: '=',
				axisX: '=',
				axisY: '='
			},
			controller: ['$scope', function($scope) {
        console.log('loading controller');
				$scope.svg;
				var refreshGraph = function() {
					var graphDiv = d3.select('#line_graph');

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
        	.x(function(d) { return x(d[$scope.axisX]); })
        	.y(function(d) { return y(d[$scope.axisY]); });

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

              var xDomain = d3.extent($scope.data, function(d) { return d[$scope.axisX]; });
              var yDomain = [0, d3.max($scope.data, function(d) { return d[$scope.axisY]; })];

              x.domain(xDomain);
              y.domain(yDomain);

            // Add the valueline path.
            svg.append("path")
            .attr("class", "line")
            .attr("d", valueline($scope.data));

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

        $scope.$watch('data', function(newValue, oldValue) {
          if ($scope.axisX && $scope.axisY && newValue && newValue.length > 0) {
            refreshGraph();
          }
        });
      }],
      templateUrl: '/directives/line_graph/line_graph.html'
		}
	})