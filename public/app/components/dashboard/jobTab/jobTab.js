(function () {
    'use strict';

    angular.module('main.module')
        .component('jobTab', {
            bindings: {

            },
            templateUrl: 'app/components/dashboard/jobTab/jobTab.html',
            controller: JobTabController,
            controllerAs: 'vm'

        });

    JobTabController.$inject = [];
    function JobTabController() {
        var vm = this;

        vm.$onInit = function() {
            vm.status = {
                completed: 'completed',
                pending: 'pending',
                notstart: 'notstart'
            };

            vm.todayJobs = [
                {
                    id: '123',
                    plateNo: '',
                    address: '20 Ubi Avenue 4, Singapore',
                    title: 'Test Driver',
                    status: vm.status.notstart,
                    driver: ''
                },
                {
                    id: '633',
                    plateNo: 'SGR 1451 SDG 6496',
                    address: 'Ethoz Group Ltd., Tampines Street 92, Singapore',
                    title: 'Replacement',
                    status: vm.status.pending,
                    driver: 'Razif'
                },
                {
                    id: '633',
                    plateNo: 'SGR 1451 SDG 6496',
                    address: 'Ethoz Group Ltd., Tampines Street 92, Singapore',
                    title: 'Replacement',
                    status: vm.status.pending,
                    driver: 'Meng'
                }
            ];
        };
    }
})();