var env = process.node_env;

// Default settings go here
var settings = {
    REDIS_PORT: 6379,
    REDIS_HOST: 'localhost',
    REDIS_MAX_ATTEMPTS: 5,

    PORT: 3000,

    LOG_LEVEL: 2,
}

if ( typeof env == 'undefined' ) {
    env = 'dev';
}

if ( env == 'dev' ) {

} else if ( env == 'test' ) {
    LOG_LEVEL = 1;
}

//console.log( "Using env:", env );

module.exports = settings;
