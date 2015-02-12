var settings = require('../../settings');
var redis = require("redis");

var redisClient = redis.createClient(settings.REDIS_PORT, settings.REDIS_HOST, {    	
	max_attempts: settings.REDIS_MAX_ATTEMPTS
});
	
redisClient.on('error', function (err) {
	console.log("Error " + err);
});

redisClient.on('ready', function() {
	console.log('Connected to redis: ' + settings.REDIS_HOST + ":" + settings.REDIS_PORT);
});

module.exports = redisClient;