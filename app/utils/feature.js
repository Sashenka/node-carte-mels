var request = require('request'),
    config = require('../config.json');
    
    
function replaceDiacritics(sString){
    if(typeof sString === 'string'){
        return sString.replace(/[^\u0000-\u007E]/g, function(a) {
            return '*' || a;
        });
    } else {
        return sString;
    }
}

function buildUrl(sTypeName, optionalFilter) {
    var sBaseUrl = config.wfs.url,
        sFormat = config.wfs.format,
        sProjection = config.wfs.projection,
        sFilter = '';

    if (optionalFilter.sPropertyName) {
        sFilter = "&FILTER=<Filter><PropertyIsLike wildcard='*' singleChar='.' escape='!'><PropertyName>" + optionalFilter.sPropertyName + "</PropertyName><Literal>" + replaceDiacritics(optionalFilter.sPropertyValue) + "</Literal></PropertyIsLike></Filter>";
    }

    return encodeURI(sBaseUrl + '&REQUEST=getFeature&TYPENAME=' + sTypeName + sFilter + '&srsName=' + sProjection + '&outputFormat=' + sFormat);
}

exports.get = function(sTypeName, optionalFilter) {
    var sURL = buildUrl(sTypeName, optionalFilter);
    
    return request.get(sURL).on('error', function(error){
        console.log(error);
    }).on('response', function(response) {
        delete response.headers['content-disposition'];
    });
};