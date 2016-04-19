/*global angular */

angular.module('controllers')
    .controller('sideNavCtrl', ['$scope', 'CommScol', 'Reseau', function($scope, CommScol, Reseau) {
        $scope.selectItem = fnSelectItem;
        
        fnInitialize();
        
        ////////////
        
        function fnInitialize(){
            CommScol.get().then(function success(response){
                $scope.cs= response.data;
            });
            
            Reseau.get().then(function success(response){
                $scope.reseau= response.data;
            });
        }
        
        function fnSelectItem(selectecItem) {
            $scope.$parent.selectedItem = selectecItem;
        }
    }]);