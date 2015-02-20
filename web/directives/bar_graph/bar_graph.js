var _ = require('underscore/underscore-min.js');
var d3 = require('d3/d3.min.js');

angular.module('Bamalytics.Directives')
	.directive('barGraph', function() {
		return {
			restrict: 'E',
			scope: {
				data: '=',
				axisX: '=',
				axisY: '='
			},
			controller: ['$scope', function($scope) {
				$scope.svg;
//        var dateFormatter = d3.time.format('%Y-%m-%d-%M');
        var dateFormatter = d3.time.format('%Y-%m-%d');
        var bucketizeData = function(data) {
          var bucketized = {};
          for (var i = 0; i < data.length; i++) {
            var dataPoint = data[i];
            var date = dataPoint[$scope.axisX];

            var dateKey = dateFormatter(new Date(date * 1000));
            bucketized[dateKey] = bucketized[dateKey] ? bucketized[dateKey] + 1 : 1;
          }

          var bucketizedArray = [];
          for (var key in bucketized) {
            var bucketizedObject = {};
            bucketizedObject[$scope.axisX] = key;
            bucketizedObject[$scope.axisY] = bucketized[key];
            bucketizedArray.push(bucketizedObject);
          }

          return bucketizedArray;
        };

        var refreshGraph = function() {
          var alteredData = bucketizeData($scope.data);

					var graphDiv = d3.select('#bar_graph');

          // Set the dimensions of the canvas / graph
        	var margin = {top: 30, right: 20, bottom: 100, left: 50};
        	var width = graphDiv[0][0].clientWidth - margin.left - margin.right;
        	var height = 270 - margin.top - margin.bottom;

        	// Set the ranges
        	var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
        	var y = d3.scale.linear().range([height, 0]);

          // Define the axes
          var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(dateFormatter);

        	var yAxis = d3.svg.axis()
            .scale(y)
           	.orient("left").ticks(5);

        	// Define the line
        	var valueline = d3.svg.line()
        	.x(function(d) { return x(dateParser(d[$scope.axisX])); })
        	.y(function(d) { return y(d[$scope.axisY]); });

          // Adds the svg canvas
          var svg;
          if ($scope.svg) {
            $scope.svg.selectAll("bar").remove();
            $scope.svg.selectAll("rect").remove();            
            $scope.svg.selectAll("g").remove();
            svg = $scope.svg;
          } else {
            svg = graphDiv
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");   
          }

          var dateParser = dateFormatter.parse;

          var xDomain = _.map(alteredData, function(d) { return dateParser(d[$scope.axisX]) });
          var yDomain = [0, d3.max(alteredData, function(d) { return d[$scope.axisY]; })];

          x.domain(xDomain);
          y.domain(yDomain);

          svg.selectAll("bar")
          .data(alteredData)
          .enter().append("rect")
          .style("fill", "#6ad125")
          .attr("x", function(d) { return x(dateParser(d[$scope.axisX])); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return height; })
          .attr("height", function(d) { return 0 })
          .transition()
          .duration(666)
          .attr("height", function(d) { return height - y(d[$scope.axisY]); })
          .attr("y", function(d) { return y(d[$scope.axisY]); });

          // Add the X Axis
          svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)" 
              });

          // Add the Y Axis
          svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);
          $scope.svg = svg;
        }

        $scope.$watch('data', function(newValue, oldValue) {
          if ($scope.axisX && $scope.axisY && newValue && newValue.length > 0) {
            console.log('refreshing graph');
            refreshGraph();
          }
        });
      }],
      templateUrl: '/directives/bar_graph/bar_graph.html'
		}
	})