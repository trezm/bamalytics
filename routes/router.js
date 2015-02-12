var middleware = require('../app/middleware');
var settings = require('../settings');

// Routes controllers
var Routes = require('../app/controllers').Routes;

var LogControllerRoutes = Routes.LogController;

module.exports.router = function(app) {
	app.use(
		function(req, res, next) {
			if (settings.LOG_LEVEL > 1) {
				console.log(req.method + " ->", req.path);
			}
			next();
		});

	// Answer
	app.post('/log', LogControllerRoutes.log);
	app.get('/log', LogControllerRoutes.query);

	// TODO: Probably remove this, as it just provides a security hole at this point,
	// since the web service was broken off into tally-web
	app.get('/*', function(req, res) {
		res.sendfile('./dist/' + req.path);
	});
}