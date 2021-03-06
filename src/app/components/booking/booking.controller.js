/**
 * Created by guankai on 02/06/2017.
 */
(function () {
    'use strict';

    angular.module('smart_container').controller('BookingController', BookingController);

    /** @ngInject */
    function BookingController(constdata, StorageService,NetworkService, $stateParams, ApiServer, toastr, $state, $timeout, $interval, $scope, optionsTransFunc) {
        /* jshint validthis: true */
        var vm = this;

        vm.title = '报警监控';
        vm.reports = [];
        vm.queryParams = {};
        $scope.transDetail = false;

        vm.pageCurrent = 1;
        vm.targetPage = 1;
        vm.pagePreEnabled = false;
        vm.pageNextEnabled = false;
        vm.pages = ['1'];
        vm.totalPages = 1;
        vm.limit = 10;
        vm.showEmpty = true;
        vm.showEmptyInfo = '暂无预约信息';

        vm.selectedStyle={
            true:'bg-selected',
            false:'bg-unselected'
        };

        vm.containerStatusSpec = {
            1:'可租用',
            2:'运输中',
            3:'不可用'
        };
        vm.containerStatusLabel = {
            1:'bg-available',
            2:'bg-transporting',
            3:'bg-not-available'
        };

        vm.appointStatus = {
            0:'预约中',
            1:'已完成',
            2:'已取消'
        }


        vm.labelColor = {
            0:'bg-info',
            1:'bg-success',
            2:'bg-danger'
        };
        vm.isViewList = false;
        vm.selList = function (isList) {
            vm.isViewList = isList;
        }





        vm.goDetail= function(item) {
            $state.go('app.edit_booking',{username:item.appointment_id, args:{type:'detail', data:item}});

        };
        $scope.basicUpdate = function(item){
            vm.options = R.merge(vm.options, {
                title: "云箱详情",
                is_insert: false
            })

            $scope.bbUpdate = !$scope.bbUpdate;
            vm.currentItem = item;
            // $scope.modalUpdate = !$scope.modalUpdate;
        };

        vm.newBasicInfoConfig = {};
        vm.basicInfoManage = {
            basicInfoConfig : {},
            alertConfig: {},
            issueConfig: {}
        };

        vm.saveBasicInfoConfig = saveBasicInfoConfig;
        vm.cancelBasicInfoConfig = cancelBasicInfoConfig;
        vm.targetPage = 1;
        vm.pageCurrent = 1;

        vm.addBasePath =  'basicInfoConfig/';
        vm.getBasePath =  'rentservice/boxinfo/query';
        vm.updateBasePath =  'basicInfoMod/';
        vm.delBasePath =  'basicInfo/';

        vm.getProvincePath = 'rentservice/regions/provinces';
        vm.getCityPath = 'rentservice/regions/cities/';
        vm.getWarehousePath =  'rentservice/site/list/province/';

        vm.options = {};
        var transformations = undefined;

        var requiredOptions = [
                    "carrier",
                    "factory",
                    "factoryLocation",
                    "batteryInfo",
                    "hardwareInfo",
                    "intervalTime",
                    "maintenanceLocation",
                    "containerType",
                    "alertCode",
                    "alertType",
                    "alertLevel"
                ];

        vm.isProvinceEnable = true;
        vm.isCityEnable = true;
        vm.isWarehouseEnable = true;
        vm.searchProvince = 1;
        vm.searchCity = 1;
        vm.searchWarehouse = 1;
        vm.isSearch = false;
        vm.searchItem = '';

        vm.infoKey = 'all.bookingInfo';

        if($stateParams.args.enterprise_id != null){
            var entInfo = {
                enterprise_id:$stateParams.args.enterprise_id,
                enterprise_name:$stateParams.args.enterprise_name
            }
            StorageService.put(vm.infoKey, entInfo, 24 * 3 * 60 * 60);
        }
        var storeInfo = StorageService.get(vm.infoKey);
        vm.enterprise_id = storeInfo.enterprise_id;
        vm.enterprise_name = storeInfo.enterprise_name;


        vm.enterEvent = function(e){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                vm.goResetSearch();
            }
        }
        vm.goResetSearch = function(){
            vm.pageCurrent = 1;
            vm.targetPage = vm.pageCurrent;
            vm.goSearch();
        }
        vm.goSearch = function(){
            vm.isSearch = true;
            console.log(vm.searchItem);


            var params = {
                "enterprise_id":vm.enterprise_id,
                "keyword":vm.searchItem
            }

            NetworkService.post('rentservice/appointment/enterpriselist?limit='+vm.limit+'&offset='+((vm.pageCurrent - 1) * vm.limit),params,function (response) {

                vm.items = response.data.results;
                if(vm.items != null && vm.items.length > 0){
                    vm.showEmpty = false;
                }else{
                    vm.showEmpty = true;
                    vm.showEmptyInfo = '暂无预约信息';
                }
                updatePagination(response.data);

            },function (response) {
                toastr.error(response.statusText);
            });




        }


        function getDatas() {
            if(vm.isSearch){
                vm.goSearch();
            }else {
                var params = {
                    "enterprise_id":vm.enterprise_id,
                    "keyword":""
                }
                //http://106.2.20.185:8000/container/api/v1/cloudbox/rentservice/boxbill/realtimebill
               // NetworkService.get('rentservice/boxbill/realtimebill', {
               NetworkService.post('rentservice/appointment/enterpriselist?limit='+vm.limit+'&offset='+((vm.pageCurrent - 1) * vm.limit),params,function (response) {
                    vm.items = response.data.results;
                    if(vm.items != null && vm.items.length > 0){
                        vm.showEmpty = false;
                    }else{
                        vm.showEmpty = true;
                        vm.showEmptyInfo = '暂无预约信息';
                    }
                    updatePagination(response.data);


                }, function (response) {
                    toastr.error(response.statusText);
                });
            }

        }




        function backAction() {
            // $state.go('app.tenant');
            $rootScope.backPre();
        }

        // 分页 Start
        vm.preAction = function () {
            vm.pageCurrent --;
            if (vm.pageCurrent < 1) vm.pageCurrent = 1;
            getDatas();
            vm.targetPage = vm.pageCurrent;
        };
        vm.nextAction = function () {
            vm.pageCurrent ++;
            getDatas();
            vm.targetPage = vm.pageCurrent;
        };
        vm.goPage = function (page) {
            console.log(page);
            vm.pageCurrent = Number(page);
            console.log(vm.pageCurrent);
            getDatas();
            vm.targetPage = vm.pageCurrent;
        };
        vm.pageCurrentState = function (page) {
            if (Number(page) == vm.pageCurrent)
                return true;
            return false;
        };

        function updatePagination(pageination) {
            if (pageination.results == null || pageination.results.length < 1){
                vm.pageCurrent = 1;
                vm.targetPage = 1;
                vm.pagePreEnabled = false;
                vm.pageNextEnabled = false;
                vm.pages = ['1'];
                vm.totalPages = 1;
                return;
            }
            var page = parseInt(pageination.offset/pageination.limit +1);
            var toalPages = pageination.count % pageination.limit == 0 ?  parseInt(pageination.count / pageination.limit):parseInt(pageination.count / pageination.limit + 1);
            vm.totalPages = toalPages;
            console.log(page + ';'+ toalPages);
            vm.pageNextEnabled = (vm.pageCurrent ==  toalPages ? false : true);
            vm.pagePreEnabled = (vm.pageCurrent ==  1  ? false : true);


            if (toalPages < 2){
                vm.pages = ['1'];
            }else{
                vm.pages = [];
                var pageControl = 5;
                var stepStart = page - (pageControl - 1)/2;
                if (stepStart < 1 || toalPages < pageControl) stepStart = 1;
                var stepEnd = stepStart + pageControl - 1;
                if (stepEnd > toalPages) {
                    stepEnd = toalPages;
                    stepStart = toalPages - pageControl + 1;
                    if (stepStart < 1){
                        stepStart = 1;
                    }
                }

                for (var i=stepStart;i<= (stepEnd > toalPages ? toalPages : stepEnd);i++) {
                    vm.pages.push(i);
                }
            }

        }



        getDatas();

        function saveBasicInfoConfig() {
            newBasicInfoConfigPost();
            $scope.bbUpdate = false;
        }

        function cancelBasicInfoConfig() {
            $scope.bbUpdate = false;
        }

        function newBasicInfoConfigPost () {
            var config = R.evolve(transformations)(vm.newBasicInfoConfig)
            console.log("new basicInfo params: ", config);
            ApiServer.newBasicInfoConfig(config, function (response) {
                console.log(response.data.code);
            },function (err) {
                console.log("Get ContainerOverview Info Failed", err);
            });
        }

        function inputTransFunc (num) {
            return parseInt(num, 10)
        }

    }

})();
