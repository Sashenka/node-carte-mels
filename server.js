// server.js

// BASE SETUP
// =============================================================================

var express = require('express'),
    compression = require('compression');

var port = process.env.PORT || 8080,
    server = express();

// ROUTING
// =============================================================================

var router = express.Router();
require('./app/routes/cs')(router);
require('./app/routes/reseau')(router);

// MIDDLEWARES
// =============================================================================

server.set('json spaces', 2);
server.set('etag', 'strong');

server.use(compression({threshold:0})); 
server.use(express.static(__dirname + '/public',{maxAge: 86400000}));

server.all('/api/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

server.use('/api', router);

server.use(function(err, req, res, next) {
    res.status(err.statusCode).json({
        statusCode: err.statusCode,
        type: err.name,
        message: err.message,
        parameters: err.parameters
    });
});

// LISTENING
// =============================================================================
server.listen(port, function(){
    console.log('Server running on port %d', port);
});

module.exports = server;