/*global angular */

angular
    .module('carteMELS', ['controllers', 'services', 'ngMaterial', 'nemLogging','ui-leaflet'])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey');
      //.accentPalette('blue-grey');
        //.dark();
    });