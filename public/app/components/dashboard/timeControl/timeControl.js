(function () {
    'use strict';

    angular.module('main.module')
        .component('timeControl', {
            bindings: {
                startTime: '=',
                sizeHour: '<'
            },
            templateUrl: 'app/components/dashboard/timeControl/timeControl.html',
            controller: TimeControlController,
            controllerAs: 'vm'

        });

    TimeControlController.$inject = [];
    function TimeControlController() {
        var vm = this;
        vm.next = next;
        vm.back = back;

        vm.$onInit = function() {
            initTimeControl();
        };

        function initTimeControl() {
            vm.ranges = [];
            vm.textHours = [];
            for(var i = 0; i <  vm.sizeHour; i++) {
                vm.ranges.push(i + vm.startTime);
                vm.textHours.push(i + vm.startTime);
            }
            vm.textHours.push(vm.startTime + vm.sizeHour);
        }

        function next (){
            vm.startTime += 1;
            initTimeControl();
        }

        function back (){
            vm.startTime -= 1;
            initTimeControl();
        }
    }
})();