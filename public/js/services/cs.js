/*global angular */

angular.module('services', [])
.factory('CommScol', ['$http', function($http) {
    
    var CSService = {
        get: fnGetCSListe,
        getLimites: fnGetCSLimitesGeo,
        getEtablissements: fnGetCSEtablissements
    };
    
    return CSService;
    
    ////////////
    
    function fnGetCSListe() {
        return $http.get('/api/cs');
    }
    
    function fnGetCSLimitesGeo(sCodeCS) {
        return $http.get('/api/cs/' + sCodeCS + '/limites');
    }
    
    function fnGetCSEtablissements(sCodeCS) {
        return $http.get('/api/cs/' + sCodeCS + '/etablissements');
    }
}]);

