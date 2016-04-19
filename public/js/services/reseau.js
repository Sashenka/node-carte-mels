/*global angular */

angular.module('services')
.factory('Reseau', ['$http', function($http) {
    var ReseauService = {
        get: fnGetRListe,
        getEtablissements: fnGetREtablissements
    };
    
    return ReseauService;
    
    ////////////
    
    function fnGetRListe() {
        return $http.get('/api/reseau');
    }
    
    function fnGetREtablissements(sNomReseau) {
        return $http.get('/api/reseau/' + sNomReseau);
    }
}]);