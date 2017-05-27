/**
 * Created by guankai on 22/05/2017.
 */
(function () {
    'use strict';

    angular.module('smart_container').controller('basicManageController', basicManageController);

    /** @ngInject */
    function basicManageController(constdata, NetworkService, MapService, $stateParams, ApiServer, toastr, $state, $timeout, $interval,$scope) {
        /* jshint validthis: true */
        var vm = this;
        $scope.modalInput = false;
        $scope.toggleModal = function() {
            $scope.modalInput = !$scope.modalInput;
        };
        $scope.modalUpdate = false;
        $scope.toggleUpdate = function(){
            $scope.modalUpdate = !$scope.modalUpdate;
        }
    }


})();
