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

        vm.onDragComplete = function($data,$event, $index) {
            vm.todayJobs.splice($index, 1);
        };

        vm.$onInit = function() {
            vm.status = {
                completed: 'completed',
                pending: 'pending',
                unassign: 'unassign'
            };

            vm.todayJobs = [
                {
                    id: '123',
                    plateNo: '',
                    address: '20 Ubi Avenue 4, Singapore',
                    title: 'Test Driver',
                    status: vm.status.unassign,
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
                    id: '3734',
                    plateNo: 'SGR 1451 SDG 6496',
                    address: 'Ethoz Group Ltd., Tampines Street 92, Singapore',
                    title: 'Replacement',
                    status: vm.status.completed,
                    driver: 'Meng'
                }
            ];
        };
    }
})();