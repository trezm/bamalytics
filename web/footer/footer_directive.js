module.exports = function(app) {
    app.directive('footer', function() {
	return {
	    restrict: 'E',
	    scope: {

	    },
	    templateUrl: '/footer/footer_view.html'
	}
    });
}