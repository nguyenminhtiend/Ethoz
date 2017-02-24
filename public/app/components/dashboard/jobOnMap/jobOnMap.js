(function () {
    'use strict';

    angular.module('main.module')
        .component('jobOnMap', {
            bindings: {},
            templateUrl: 'app/components/dashboard/jobOnMap/jobOnMap.html',
            controller: JobOnMapController,
            controllerAs: 'vm'

        });

    JobOnMapController.$inject = ['NgMap'];
    function JobOnMapController(NgMap) {
        var vm = this;
        vm.showDetail = showDetail;

        vm.$onInit = function () {
            NgMap.getMap().then(function (map) {
                vm.map = map;
            });

            vm.status = {
                completed: 'completed',
                pending: 'pending',
                notstart: 'notstart'
            };

            vm.jobs = [
                {
                    id: '123',
                    plateNo: '',
                    address: '20 Ubi Avenue 4, Singapore',
                    title: 'Test Driver',
                    status: vm.status.notstart
                },
                {
                    id: '633',
                    plateNo: 'SGR 1451 SDG 6496',
                    address: 'Ethoz Group Ltd., Tampines Street 92, Singapore',
                    title: 'Replacement',
                    status: vm.status.pending
                }
            ];
        };

        vm.placeChanged = function() {
            vm.place = this.getPlace();
            vm.map.setCenter(vm.place.geometry.location);
        }

        vm.click = function () {
            alert('6236236');
        };

        function showDetail(e, job) {
            vm.currentJob = job;
            vm.map.showInfoWindow('job-info', job.id);
        }
    }
})();