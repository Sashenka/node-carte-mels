var _ = require('underscore'),
    httpErrors = require('httperrors'),
    
    MELS_RESEAUX = require('../models/MELS_RESEAUX.json'),
    Reseau = require('../controllers/reseau');

module.exports = function(router) {
    //Reseaux
    router.param('sType', function(req, res, next, sType){
        var oReseau = _.findWhere(MELS_RESEAUX.types, {routeParamName: sType});
        
        if(!oReseau){
            return next(new httpErrors.NotFound({message: 'Aucun réseau trouvée.', parameters: req.params}));
        }
        
        req.oReseau = oReseau;
        next();
    });
    
    router
        .route('/reseau')
        .get(Reseau.getAllReseaux);
    
    router
        .route('/reseau/:sType')
        .get(Reseau.getReseau);
};