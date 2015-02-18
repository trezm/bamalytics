angular.module('Bamalytics.Services')
  .factory('AverageLoadService', ['ApiService',
    function(ApiService) {
    	var query = function(_query, callback) {
    		ApiService.query(_query, callback)
    	}

      return {
      	query: query
      };
    }
  ]);