angular.module('Bamalytics.Services')
  .factory('ApiService', ['$http',
    function($http) {
    	var query = function(_query, callback) {
    		$http.get('/log?query=' + _query)
    		    .success(function(data, status, headers, config) {
    		    	callback(null, data);
    		    }).
    		    error(function(data, status, headers, config) {
    		    	callback(data);
    		    });
    	}
    	
    	return {
    		query: query
    	};
    }
  ]);