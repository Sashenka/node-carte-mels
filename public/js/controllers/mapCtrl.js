/*global angular */
/*global L */

angular.module('controllers')
    .controller('mapCtrl', ['$scope', '$timeout', '$mdToast', 'leafletData', 'CommScol', 'Reseau', function($scope, $timeout, $mdToast, leafletData, CommScol, Reseau) {
        $scope.loading = false;
        $scope.markerLayer = null;
        $scope.geojson = null;
        
        $scope.$watch('selectedItem', fnWatchSelection);
        
        fnInitializeMap();
        
        ////////////
        
        function fnInitializeMap () {
            angular.extend($scope, {
                defaults: {
                    tileLayer: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
                    maxZoom: 14,
                    minZoom: 4,
                    path: {
                        weight: 10,
                        color: '#800000',
                        opacity: 1
                    }
                },
                center: {
                    lat: 50.367922,
                    lng: -69.499268,
                    zoom: 6
                }
            });
            
            $timeout(function() {
                leafletData.getMap().then(function(map) {
                    map.invalidateSize(false);
                });
            }, 200);
        }
        
        function fnWatchSelection (newValue, oldValue){
            if(!newValue){
                return;
            }
            
            if ($scope.markerLayer){
                $scope.markerLayer.clearLayers();
            }
            
            $scope.geojson = null;
            $scope.loading = true;
            
            if (newValue.hasOwnProperty('code_cs')) {
                CommScol.getLimites(newValue.code_cs)
                    .then(function success (response) {
                        angular.extend($scope, {
                            geojson: {
                                data: response.data,
                                style: {
                                    fillColor: "#008cba",
                                    weight: 3,
                                    opacity: 1,
                                    color: '#008cba',
                                    fillOpacity: 0.3
                                }
                            }
                        });
                        
                        $scope.selectedItemInfos = {
                            nom: response.data.features[0].properties.nom_officiel_cs,
                            code: '(' + response.data.features[0].properties.code_cs + ') ',
                            url: response.data.features[0].properties.site_web
                        };
                        
                        return CommScol.getEtablissements(newValue.code_cs);
                    })
                    .then(function(response) {
                        fnDrawMarkers(response.data);
                        $scope.selectedItemInfos.details = response.data.features.length + ' établissements';
                    }, function error (err){
                        fnShowErrorToast(err.statusText + ' ('+ err.status + ') - ' + err.data);
                    }).finally(function(){
                        $scope.loading = false;
                    });
                    
            } else if (newValue.hasOwnProperty('routeParamName')){
                Reseau.getEtablissements(newValue.routeParamName)
                    .then(function success (response){
                        fnDrawMarkers(response.data);
                        
                        $scope.selectedItemInfos = {
                            nom: newValue.descr,
                            details: response.data.features.length + ' établissements',
                            url: 'http://www.education.gouv.qc.ca/'
                        };
                    }, function error (err){
                        fnShowErrorToast(err.statusText + ' ('+ err.status + ') - ' + err.data);
                    }).finally(function(){
                        $scope.loading = false;
                    });
            }
        }
        
        function fnDrawMarkers(sGeoJson){
            leafletData.getMap().then(function(map) {
                var markers = L.markerClusterGroup({
                    showCoverageOnHover: false,
                    disableClusteringAtZoom: 12,
                    spiderfyDistanceMultiplier: 2,
                    iconCreateFunction: function(cluster) {
                        return new L.DivIcon({
                            html: '<div><span>' + cluster.getChildCount() + '</span></div>',
                            className: 'marker-cluster',
                            iconSize: new L.Point(40, 40)
                        });
                    }
                });
                
                $scope.markerLayer = L.geoJson(sGeoJson, {
                        pointToLayer: function(feature, latlng) {
                            return L.marker(latlng, {
                                icon: L.AwesomeMarkers.icon({
                                    icon: 'university',
                                    markerColor: 'cadetblue',
                                    prefix: 'ion'
                                }),
                                title: feature.properties.nom_immeuble || feature.properties.nom
                            });
                        },
                        onEachFeature: function(feature, layer) {
                            layer.on({
                                mouseover: function() {
                                    $scope.selectedEtab = feature.properties.nom_immeuble || feature.properties.nom;
                                },
                                mouseout: function() {
                                    $scope.selectedEtab = null;
                                }
                            });
                        }
                    })
                    .addTo(markers);
                    
                    map.addLayer(markers);
                    map.fitBounds(markers.getBounds());
                    
                    $scope.markerLayer = markers;
            });
        }
        
        function fnShowErrorToast(sErrorMessage){
            $mdToast.show(
                $mdToast.simple()
                    .textContent(sErrorMessage)
                    .action('FERMER')
                    .position('top right')
                    .hideDelay(0)
            );
        }
        
        /*
        function fnCentrer() {
            leafletData.getMap().then(function(map) {
                var latlngs = [];
                var points;
                
                if($scope.geojson.data.features[0].geometry.coordinates.length == 1){
                    for (var i in $scope.geojson.data.features[0].geometry.coordinates) {
                        points = $scope.geojson.data.features[0].geometry.coordinates[i];
                        for (var k in points) {
                            latlngs.push(L.GeoJSON.coordsToLatLng(points[k]));
                        }
                    }
                } else {
                    for (var i in $scope.geojson.data.features[0].geometry.coordinates) {
                        var coord = $scope.geojson.data.features[0].geometry.coordinates[i];
                        for (var j in coord) {
                            latlngs.push(L.GeoJSON.coordsToLatLng(coord[j]));
                        }
                    }
                }
                
                map.fitBounds(latlngs);
            });
        }
        */
        
    }]);