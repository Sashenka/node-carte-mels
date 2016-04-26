var redis = require('redis');
require('redis-streams')(redis);

var client = redis.createClient(6379, process.env.IP, {
    return_buffers: true
});

exports.get = function(req, res, next) {
    var sKey = req.url;

    client.exists(sKey, function(err, exists) {
        if (err) {
            console.log('Erreur de cache: ' + err);
            next();
        }

        if (exists) {
            res.set('content-type', 'application/json; subtype=geojson; charset=iso-8859-1');
            return client.readStream(sKey).pipe(res);
        }

        return next();
    });
};

exports.set = function(sKey, sStream) {
    sStream.pipe(client.writeStream(sKey, 60));
};