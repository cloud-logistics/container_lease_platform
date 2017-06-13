/**
 * Created by guankai on 22/05/2017.
 */
(function () {
    'use strict';

    angular.module('smart_container').controller('BoxstatusController', BoxstatusController);

    /** @ngInject */
    function BoxstatusController(constdata, NetworkService, MapService, $stateParams, ApiServer, toastr, $state, $timeout, $interval,$scope, optionsTransFunc) {
        /* jshint validthis: true */
        var vm = this;

        vm.title = '云箱状态汇总';
        vm.containerlist = [];
        vm.queryParams = $stateParams
        vm.getBoxStatus = getBoxStatus

        var transformations = undefined;

        var requiredOptions = [
                    "currentStatus",
                    "location",
                    "alertLevel",
                    "alertType",
                    "alertCode",
                    "carrier"
                ]

        ApiServer.getOptions(requiredOptions, function(options) {
            vm.options = options

            transformations = {
                currentStatus: optionsTransFunc(vm.options.currentStatus),
                location: optionsTransFunc(vm.options.location),
                alertLevel: optionsTransFunc(vm.options.alertLevel),
                alertType: optionsTransFunc(vm.options.alertType),
                alertCode: optionsTransFunc(vm.options.alertCode),
                carrier: optionsTransFunc(vm.options.carrier)
            }

            vm.queryParams = {
                currentStatus : R.compose(R.prop("value"),R.head)(vm.options.currentStatus),
                location : R.compose(R.prop("value"),R.head)(vm.options.location),
                alertLevel : R.compose(R.prop("value"),R.head)(vm.options.alertLevel),
                alertType : R.compose(R.prop("value"),R.head)(vm.options.alertType),
                alertCode : R.compose(R.prop("value"),R.head)(vm.options.alertCode),
                carrier : R.compose(R.prop("value"),R.head)(vm.options.carrier),
            }

            console.log(vm.queryParams);

            getBoxStatus();
        })

        function getBoxStatus () {
            var queryParams = R.evolve(transformations)(vm.queryParams)
            console.log(queryParams);
            ApiServer.getBoxStatus(queryParams, function (response) {
                vm.containerlist = response.data.boxStatus
            },function (err) {
                console.log("Get ContainerOverview Info Failed", err);
            });
        }
    }

})();
