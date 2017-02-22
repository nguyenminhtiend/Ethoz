(function () {
    'use strict';

    angular.module('main.module')
        .component('driverChartTime', {
            bindings: {
                startTime: '=',
                sizeHour: '<'
            },
            templateUrl: 'app/components/dashboard/driverChartTime/driverChartTime.html',
            controller: DriverChartTimeController,
            controllerAs: 'vm'

        });

    DriverChartTimeController.$inject = ['$scope', 'timeService'];
    function DriverChartTimeController($scope, timeService) {
        var vm = this;
        vm.status = {
            completed: 'completed',
            pending: 'pending',
            notstart: 'notstart'
        };
        vm.onDropComplete = function (data, event) {
            alert('Drop done: ' + data);
        };

        $scope.$watch("vm.startTime", convertJobToRender);

        vm.$onInit = function () {
            initJob();
            convertJobToRender();
        };

        function initJob() {
            vm.jobs = [
                {
                    name: 'Replacement',
                    startTime: '9',
                    endTime: '10',
                    status: vm.status.completed
                },
                {
                    name: 'Replacement',
                    startTime: '7',
                    endTime: '8:30',
                    status: vm.status.pending
                },
                {
                    name: 'Replacement',
                    startTime: '11:30',
                    endTime: '13:30',
                    status: vm.status.notstart
                }];
        }

        function convertJobToRender() {
            vm.jobs = timeService.sortByStartTime(vm.jobs);

            var currentPosition = vm.startTime.toString();
            for(var i = 0; i < vm.jobs.length; i++) {
                var distance = getPercentageFromDistance(vm.jobs[i].startTime, vm.jobs[i].endTime);
                vm.jobs[i].style = {
                    'width': distance + '%',
                    'margin-left': getPercentageFromDistance(currentPosition, vm.jobs[i].startTime) + '%'
                };
                vm.jobs[i].isDisplay = distance !== 0;
                currentPosition = vm.jobs[i].endTime;
            }
        }

        function getPercentageFromDistance(start, end) {
            var startTime = timeService.getTimeObject(start);
            var endTime = timeService.getTimeObject(end);
            var rangeMinute = getTotalMinute(endTime) - getTotalMinute(startTime);
            return (12.5 * rangeMinute) / 60;
        }


        function getTotalMinute(time) {
            var hour = time.hour;
            var minute = time.minute;

            if(hour < vm.startTime) {
                hour = vm.startTime;
                minute = 0;
            }
            if(hour > (vm.startTime + vm.sizeHour) || (hour === (vm.startTime + vm.sizeHour) && minute > 0) ) {
                hour = vm.startTime + vm.sizeHour;
                minute = 0;
            }
            return hour * 60 + minute;
        }
    }
})();