(function () {
    'use strict';

    angular.module('main.module')
        .component('jobCell', {
            bindings: {
                job: '=',
                isTaskActive: '<'
            },
            templateUrl: 'app/components/dashboard/jobCell/jobCell.html',
            controller: JobCellController,
            controllerAs: 'vm'

        });

    JobCellController.$inject = ['$rootScope'];
    function JobCellController($rootScope) {
        var vm = this;
        vm.status = {
            completed: 'completed',
            pending: 'pending',
            unassign: 'unassign'
        };

        vm.$onInit = function() {
            vm.menuOptions = [
                ['Set duration', function ($itemScope, $event, modelValue, text, $li) {
                    alert('Set duration');
                }],
                null, // Dividier
                ['Add task', function ($itemScope, $event, modelValue, text, $li) {
                    alert('Add task');
                }],
                null, // Dividier
                ['Add petrol card', function ($itemScope, $event, modelValue, text, $li) {
                    alert('Add petrol card');
                }]
            ];
            vm.dynamicPopover = {
                content: 'Hello, World!',
                templateUrl: 'myPopoverTemplate.html',
                title: 'Title'
            };
        };
    }
})();