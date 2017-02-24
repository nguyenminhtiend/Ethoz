(function () {
    'use strict';

    angular.module('main.module')
        .component('timeControl', {
            bindings: {
                startTime: '=',
                sizeHour: '<',
                timeChange: '&'
            },
            templateUrl: 'app/components/dashboard/timeControl/timeControl.html',
            controller: TimeControlController,
            controllerAs: 'vm'

        });

    TimeControlController.$inject = ['timeService'];
    function TimeControlController(timeService) {
        var vm = this;
        vm.next = next;
        vm.back = back;

        vm.$onInit = function () {
            initTimeControl();
            initCurrentTime();
        };

        function initCurrentTime() {
            vm.isShowCurrentTime = timeService.isShowCurrentTime(vm.startTime, vm.sizeHour);
            if(vm.isShowCurrentTime) {
                var left = timeService.getPercentageFromDistance(vm.startTime, timeService.getCurrentTime(), vm.startTime, vm.sizeHour) + 12.5;
                vm.currentTimeStyles = {
                    'left': left - 4 + '%'
                };
                vm.timeText = timeService.getCurrentTimeText();
            }
        }

        function initTimeControl() {
            vm.ranges = [];
            vm.textHours = [];
            for (var i = 0; i < vm.sizeHour; i++) {
                vm.ranges.push(i + vm.startTime);
                vm.textHours.push(i + vm.startTime);
            }
            vm.textHours.push(vm.startTime + vm.sizeHour);
        }

        function next() {
            vm.startTime += 1;
            vm.$onInit();
            vm.timeChange();
        }

        function back() {
            vm.startTime -= 1;
            vm.$onInit();
            vm.timeChange();
        }
    }
})();