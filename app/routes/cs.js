var _ = require('underscore'),
    httpErrors = require('httperrors'),
    
    MELS_CS = require('../models/MELS_CS.json'),
    CS = require('../controllers/cs');

module.exports = function(router) {
    //Commission scolaires
    router.param('iCodeCS', function(req, res, next, iCodeCS){
        var oCS;
        
        if(isNaN(iCodeCS)){
            return next(new httpErrors.BadRequest({message: 'Le code de la Commission scolaire doit être un nombre entier.' , parameters: req.params}));
        }
        
        _.each(MELS_CS.types, function(type){
            var cs = _.findWhere(type.cs, {code_cs: parseInt(req.params.iCodeCS, 10)});
            
            if(cs){
                oCS = {
                    typeName: type.typeName,
                    code_cs: cs.code_cs,
                    nom_officiel_cs: cs.nom_officiel_cs
                };
            }
        });
        
        if(!oCS){
            return next(new httpErrors.NotFound({message: 'Aucune Commission scolaire trouvée.' , parameters: req.params}));
        }
        
        req.oCS = oCS;
        next();
    });
    
    router
        .route('/cs')
        .get(CS.getAllCS);

    router
        .route('/cs/:iCodeCS')
        .get(CS.get);

    router
        .route('/cs/:iCodeCS/limites')
        .get(CS.getLimites);

    router
        .route('/cs/:iCodeCS/etablissements')
        .get(CS.getEtablissements);
};