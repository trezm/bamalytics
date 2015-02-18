var validate = require('petemertz-express-validator')
var redis = require('../initializers/redis');
var async = require('async');
var uuid = require('uuid');
var redisKeys = require('../lib/redisKeys');

var _createLogQueueFunction = function(params) {
	return function(next) {
		params.key = params.key ? params.key : "no-key";
		params.identifier = params.identifier ? params.identifier : "no-identifier";
		params.severity = params.severity ? params.severity : "info";
		params.indices = params.indices ? params.indices : [];
		params.uuid = uuid.v4();

		var redisFunctions = {
			addUUIDForKey: function(next) {
				redis.rpush(redisKeys.redisKeyForKey(params.key), params.uuid, next);
			},
			addUUIDForKeyAndIdentifier: function(next) {
				redis.rpush(redisKeys.redisKeyForIdentifier(params.key, params.identifier), params.uuid, next);
			},
			addDataForUUID: function(next) {
				redis.set(redisKeys.redisKeyForUUID(params.uuid), params.data, next);
			}			
		}

		for (var i = 0; i < params.indices.length; i++) {
			var field = params.indices[i];

			redisFunctions['addUUIDFor' + field] = function(next) {
				redis.set(
					redisKeys.redisKeyForFieldAndValue(
						params.key, 
						params.identifier, 
						field,
						params.data[field]),
					params.uuid,
					next);
			}
		}

		async.parallel(redisFunctions, next);
	}
}


module.exports.Controller = {
	writeLogMessage: function(logs, callback) {
		var logQueue = [];
		for (var i = 0; i < logs.length; i++) {
			var params = logs[i];

			logQueue.push(_createLogQueueFunction(params));
	    }

	    async.parallel(logQueue, callback);
	},

	query: function(query, callback) {
		var splitQuery = query.split(' ');
		splitQuery.push(callback);
		redis[splitQuery.shift()].apply(redis, splitQuery);
	}
}

module.exports.Routes = {
	log: function(req, res) {
		if (validate({
			logs: 'required'
		}, req, res)) {
			module.exports.Controller.writeLogMessage(
				req.body.logs,
				function(error, results) {
					res.json(results);
				});
		}
	},

	query: function(req, res) {
		if (validate({
			query: 'required'
		}, req, res)) {
			module.exports.Controller.query(
				req.query.query,
				function(error, results) {
					if (error) {
						res.status(500).json(error);
					}
					else
					{
						res.json(results);
					}
				});
		}
	}
}