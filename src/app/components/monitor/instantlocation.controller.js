/**
 * Created by Otherplayer on 16/7/21.
 */
(function () {
    'use strict';

    angular.module('smart_container').controller('InstantlocationController', InstantlocationController);

    /** @ngInject */
    function InstantlocationController($stateParams,ApiServer,MapService,toastr,$state,$timeout,$interval,$scope) {
        /* jshint validthis: true */
        var vm = this;

        var width = document.body.clientWidth;
        var height = document.body.clientHeight;
        vm.mapSize = {"width":width + 'px',"height":height + 'px'};

        vm.queryParams = {
          containerId : $stateParams.containerId
        };

        var map = MapService.map_init("instantlocation", "terrain", 4);

        // 鼠标绘图工具
        var overlay = undefined;

        var geocoder = new google.maps.Geocoder;

        vm.getInstantlocationInfo = getInstantlocationInfo

        getInstantlocationInfo();
        var timer = $interval(function(){
            getInstantlocationInfo();
        },50000, 500);

        $scope.$on("$destroy", function(){
            $interval.cancel(timer);
        });

        function getInstantlocationInfo() {
            ApiServer.getInstantlocationInfo(vm.queryParams, function (response) {
                var bounds = new google.maps.LatLngBounds();
                var containerInfo = response.data.containerInfo
                var startPosition = response.data.startPosition
                var currentPosition = response.data.currentPosition
                var currentLocationName = response.data.currentLocationName;
                var endPosition = response.data.endPosition

                console.log(response.data);

                var startPositionMarker = MapService.addMarker(map)(startPosition)
                var currentPositionMarker = MapService.addMarker(map)(currentPosition)
                var endPositionMarker = MapService.addMarker(map)(startPosition)

                infoWindow(map, currentPositionMarker, "当前点: " + currentLocationName)

                bounds.extend(startPositionMarker.getPosition());
                bounds.extend(currentPositionMarker.getPosition());
                bounds.extend(endPositionMarker.getPosition());

                direction(startPosition, currentPosition)
                direction(currentPosition, endPosition)

                map.fitBounds(bounds);

            },function (err) {
                console.log("Get Historyview Info Failed", err);
            });
        }

        function infoWindow(map, marker, content) {
          var infowindow = new google.maps.InfoWindow({
            content: content
          });

          infowindow.open(map, marker);
        }

        function direction(startPointLatlng, endPointLatlng) {
          var directionsDisplay = new google.maps.DirectionsRenderer();
          var directionsService = new google.maps.DirectionsService();
          var control = document.getElementById('floating-panel');

          directionsDisplay.setMap(map);
          // directionsDisplay.setPanel(document.getElementById('right-panel'));

          // control.style.display = 'block';
          // map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);


          var request = {
            origin: startPointLatlng,
            destination: endPointLatlng,
            travelMode: 'DRIVING'
          };


          directionsService.route(request, function(result, status) {
            if (status == 'OK') {
              directionsDisplay.setDirections(result);
            }
          });


        }

    }

})();
