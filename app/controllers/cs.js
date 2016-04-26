var Feature = require('../utils/feature'),
    MELS_CS = require('../models/MELS_CS.json'),
    MELS_RESEAUX = require('../models/MELS_RESEAUX.json');

exports.getAllCS = function(req, res, next) {
    return res.status(200).json(MELS_CS);
};

exports.get = function(req, res, next) {
    return res.status(200).json(req.oCS);
};

exports.getLimites = function(req, res, next) {
    Feature.get(req.url, req.oCS.typeName, {
        sPropertyName: 'code_cs',
        sPropertyValue: req.oCS.code_cs
    }).pipe(res);
};

exports.getEtablissements = function(req, res, next) {
    var reseauPublic = MELS_RESEAUX.types[0];
    
    Feature.get(req.url, reseauPublic.typeName, {
        sPropertyName: 'commission_scolaire',
        sPropertyValue: req.oCS.nom_officiel_cs
    }).pipe(res);
};