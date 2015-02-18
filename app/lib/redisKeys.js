var settings = require('../../settings');

var redisKeyForKey = function(key) {
	return settings.REDIS_PREFIX + ":" + key;
}

var redisKeyForIdentifier = function(key, identifier) {
	return settings.REDIS_PREFIX + ":" + key + ':' + identifier;
}

var redisKeyForFieldAndValue = function(key, identifier, field, value) {
	return settings.REDIS_PREFIX + ":" + key + ':' + identifier + ':' + field + ':' + value;
}

var redisKeyForUUID = function(uuid) {
	return settings.REDIS_PREFIX + ":" + uuid;
}

module.exports = {
	redisKeyForKey: redisKeyForKey,
	redisKeyForIdentifier: redisKeyForIdentifier,
	redisKeyForFieldAndValue: redisKeyForFieldAndValue,
	redisKeyForUUID: redisKeyForUUID
}