var Feature = require('../utils/feature'),
    MELS_RESEAUX = require('../models/MELS_RESEAUX.json');

exports.getAllReseaux = function(req, res, next) {
    return res.status(200).json(MELS_RESEAUX);
};

exports.getReseau = function (req, res, next){
    Feature.get(req.url, req.oReseau.typeName)
        .on('error', function(err) {
            return next({
                statusCode: 500,
                error: err,
                parameters: req.params
            });
        }).pipe(res);
};