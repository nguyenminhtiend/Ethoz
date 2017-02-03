(function () {
    'use strict';

    angular.module('main.module')
        .component('jobOnMap', {
            bindings: {

            },
            templateUrl: 'app/components/dashboard/jobOnMap/jobOnMap.html',
            controller: JobOnMapController,
            controllerAs: 'vm'

        });

    JobOnMapController.$inject = ['NgMap'];
    function JobOnMapController(NgMap) {
        var vm = this;

        vm.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyACK-A7YHo0jyMzEQQHarZw8uMikeQ379k";

        NgMap.getMap().then(function(map) {
            vm.showCustomMarker= function(evt) {
                map.customMarkers.foo.setVisible(true);
                map.customMarkers.foo.setPosition(this.getPosition());
            };
            vm.closeCustomMarker= function(evt) {
                this.style.display = 'none';
            };
        });

        vm.map = { center: { latitude: 1.290270, longitude: 103.851959 }, zoom: 13 };

        vm.$onInit = function () {
            vm.markers = [
                {
                    id: 1,latitude: 1.290270, longitude: 103.851959, title: 'Maker 1'
                },
                {
                    id: 2, latitude: 1.390270, longitude: 103.8519359, title: 'Maker 2'
                }
            ];

            // var geocoder = new google.maps.Geocoder();
            // geocoder.geocode( { "address": "20 Ubi Avenue 4, Singapore" }, function(results, status) {
            //     if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
            //         var location = results[0].geometry.location,
            //             lat      = location.lat(),
            //             lng      = location.lng();
            //         vm.map = { center: { latitude: lat, longitude: lng }, zoom: 8 };
            //     }
            // });
        }

        vm.onClick = function(marker, eventName, model) {
            vm.currentMarker = marker;
            model.show = !model.show;
        };
    }
})();