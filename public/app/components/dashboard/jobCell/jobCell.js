(function () {
    'use strict';

    angular.module('main.module')
        .component('jobCell', {
            bindings: {
                job: '=',
                dragComplete: '&'
            },
            templateUrl: 'app/components/dashboard/jobCell/jobCell.html',
            controller: JobCellController,
            controllerAs: 'vm'

        });

    JobCellController.$inject = [];
    function JobCellController() {
        var vm = this;
        vm.status = {
            completed: 'completed',
            pending: 'pending',
            unassign: 'unassign'
        };

        vm.onDragComplete = function ($data, $event) {
            vm.dragComplete();
        };

        vm.$onInit = function() {
            vm.menuOptions = [
                ['View detail', function ($itemScope, $event, modelValue, text, $li) {
                    vm.popoverIsOpen = true;
                }],
                null, // Dividier
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