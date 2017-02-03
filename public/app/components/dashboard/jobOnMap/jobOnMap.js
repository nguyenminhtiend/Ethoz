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

            vm.jobs = [
                {
                    id: '123',
                    address: '20 Ubi Avenue 4, Singapore',
                    title: 'Marker 1'
                },
                {
                    id: '633',
                    address: 'Ethoz Group Ltd., Tampines Street 92, Singapore',
                    title: 'Marker 2'
                }
            ];
        };

        function showDetail(e, job) {
            vm.currentJob = job;
            vm.map.showInfoWindow('job-info', job.id);
        }
    }
})();