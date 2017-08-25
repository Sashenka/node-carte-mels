var redis = require('redis');
require('redis-streams')(redis);

//process.env.REDIS_URL
var client = redis.createClient(process.env.REDIS_URL, {
    return_buffers: true
});

exports.get = function(req, res, next) {
    var sKey = req.url;
    
    if(req.query.nocache){
        return next();
    }

    client.exists(sKey, function(err, exists) {
        if (err) {
            console.log('Erreur de cache: ' + err);
            next();
        }

        if (exists) {
            res.set('content-type', 'application/json; subtype=geojson; charset=iso-8859-1');
            res.set('X-CACHED-RESPONSE', '1');
            return client.readStream(sKey).pipe(res);
        }

        return next();
    });
};

exports.set = function(sKey, sStream) {
    sStream.pipe(client.writeStream(sKey, 300));
};