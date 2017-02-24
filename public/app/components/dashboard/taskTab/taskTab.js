(function () {
    'use strict';

    angular.module('main.module')
        .component('taskTab', {
            bindings: {

            },
            templateUrl: 'app/components/dashboard/taskTab/taskTab.html',
            controller: TaskTabController,
            controllerAs: 'vm'

        });

    TaskTabController.$inject = [];
    function TaskTabController() {
        var vm = this;

        vm.onDragComplete = function($data,$event, $index) {
            vm.tasks.splice($index, 1);
        };

        vm.$onInit = function() {
            vm.status = {
                completed: 'completed',
                pending: 'pending',
                unassign: 'unassign'
            };

            vm.tasks = [
                {
                    id: '123',
                    requestNo: '46943435',
                    description: 'Pick Lisheng up from 20 Ubi Avenue 4, Singapore. Contact 68203968',
                    status: vm.status.unassign,
                    driver: ''
                },
                {
                    id: '633',
                    requestNo: '46943435',
                    description: 'Pick Lisheng up from Ethoz Group Ltd., Tampines Street 92, Singapore. Contact 68203968',
                    status: vm.status.pending,
                    driver: 'Razif'
                },
                {
                    id: '3734',
                    requestNo: '46943435',
                    description: 'Pick Lisheng up from Ethoz Group Ltd., Tampines Street 92, Singapore. Contact 68203968',
                    status: vm.status.completed,
                    driver: 'Lisheng'
                }
            ];
        };
    }
})();