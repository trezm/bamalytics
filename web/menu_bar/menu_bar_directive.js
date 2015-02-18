module.exports = function(app) {
	app.directive('menubar', function() {
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			templateUrl: '/menu_bar/menu_bar_view.html'
		}
	});
}