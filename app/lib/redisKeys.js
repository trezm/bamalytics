var redisKeyForKey = function(key) {
	return key;
}

var redisKeyForIdentifier = function(key, identifier) {
	return key + ':' + identifier;
}

var redisKeyForFieldAndValue = function(key, identifier, field, value) {
	return key + ':' + identifier + ':' + field + ':' + value;
}

var redisKeyForUUID = function(uuid) {
	return uuid;
}

module.exports = {
	redisKeyForKey: redisKeyForKey,
	redisKeyForIdentifier: redisKeyForIdentifier,
	redisKeyForFieldAndValue: redisKeyForFieldAndValue,
	redisKeyForUUID: redisKeyForUUID
}