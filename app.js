// Settings
var settings = require( './settings' );

// Express
var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var multer = require('multer');

app.use(bodyParser());
app.use(multer({
	inMemory: true
}));

var server = require( 'http' ).createServer( app ).listen( settings.PORT );

var routes = require( './routes/router' );
routes.router( app );