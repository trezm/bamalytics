module.exports = function(app) {
	// Require the directive
	require('./footer_directive')(app);
	app.controller('FooterController', function($scope) {
		// var isLoggedIn = function() {
		// 	return $scope.user != undefined &&
		// 		$scope.user != null;
		// }

		// var logout = function() {
		// 	UserService.logout();
		// 	window.location = '/';
		// }

		// var login = function() {
		// 	window.location = '/login';
		// }

		// $scope.isLoggedIn = isLoggedIn;
		// $scope.logout = logout;
		// $scope.login = login;
	});
}