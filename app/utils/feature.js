var request = require('request'),
    config = require('../config.json');

/**
 * Remplace les caractères diacritiques par * pour la requête sur le serveur WFS avec le paramètres qPropertyValue.
 * http://jsperf.com/diacritics/12
 * @param {string} sString
 * @return {string} sString avec les caractères diacritiques remplacés par *.
 */
function replaceDiacritics(sString) {
    if (typeof sString === 'string') {
        return sString.replace(/[^\u0000-\u007E]/g, function(a) {
            return '*' || a;
        });
    } else {
        return sString;
    }
}

/**
 * Construit le URL pour la requête au serveur WFS.
 * @param {string} sTypeName
 * @param {Object} optionalFilter (Optional)
 *      @option {string} sPropertyName
 *      @option {string} sPropertyValue 
 * @return {string} URL à interrogé.
 */
function buildUrl(sTypeName, optionalFilter) {
    var sBaseUrl = config.wfs.url,
        sFormat = config.wfs.format,
        sProjection = config.wfs.projection,
        sFilter = '';

    if (optionalFilter) {
        sFilter = "&FILTER=<Filter><PropertyIsLike wildcard='*' singleChar='.' escape='!'><PropertyName>" + optionalFilter.sPropertyName + "</PropertyName><Literal>" + replaceDiacritics(optionalFilter.sPropertyValue) + "</Literal></PropertyIsLike></Filter>";
    }

    return encodeURI(sBaseUrl + '&REQUEST=getFeature&TYPENAME=' + sTypeName + sFilter + '&srsName=' + sProjection + '&outputFormat=' + sFormat);
}

/**
 * Interroge le serveur WFS avec une requête GET et le URL construit par la fonction buildUrl. Se charge aussi d'enlever 'content-disposition' des headers pour avoir une reponse en JSON au lieu d'un fichier à télécharger.
 * @param {string} sTypeName
 * @param {Object} optionalFilter (Optional)
 *      @option {string} sPropertyName
 *      @option {string} sPropertyValue 
 * @return {object} L'objet de type Request.
 */
exports.get = function(sTypeName, optionalFilter) {
    var sURL = buildUrl(sTypeName, optionalFilter);
    
    return request.get(sURL).on('error', function(error) {
        console.log('erreur:' + error);
    }).on('response', function(response) {
        delete response.headers['content-disposition'];
    });
};