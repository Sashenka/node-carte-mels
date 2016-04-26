var _ = require('underscore'),
    httpErrors = require('httperrors'),
    
    MELS_RESEAUX = require('../models/MELS_RESEAUX.json'),
    Cache = require('../utils/cache'),
    Reseau = require('../controllers/reseau');
    
/**
 * Trouve et retourne le réseau spécifié par sType dans le fichier MELS_RESEAUX.json.
 * @param {string} sType
 * @return {object} oReseau.
 */
function fnGetReseau(req, res, next, sType) {
    var oReseau = _.findWhere(MELS_RESEAUX.types, {
        routeParamName: sType
    });

    if (!oReseau) {
        return next(new httpErrors.NotFound({
            message: 'Aucun réseau trouvée.',
            parameters: req.params
        }));
    }

    req.oReseau = oReseau;
    next();
}

module.exports = function(router) {
    router.all('/reseau/*', Cache.get);
    router.param('sType', fnGetReseau);
    
    router
        .route('/reseau')
        .get(Reseau.getAllReseaux);
    
    router
        .route('/reseau/:sType')
        .get(Reseau.getReseau);
};