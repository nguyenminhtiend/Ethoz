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
            unassign: 'unassign'
        };

        vm.onDropComplete = function (data, event, drap) {
            if(!data){
                return;
            }
            var job = angular.copy(data);
            var startTime = drap.hour + ':' + drap.minute;
            var endTime = drap.hour + 1 + ':' + drap.minute;
            job.startTime = startTime;
            job.endTime = endTime;
            vm.jobs.push(job);
            convertJobToRender();
        };

        vm.onDragComplete = function (index) {
            vm.jobs.splice(index, 1);
            convertJobToRender();
        };

        vm.$onInit = function () {
            initJob();
            initCurrentTime();
            convertJobToRender();
            initTimeForDrap();
            $scope.$watch("vm.startTime", onTimeChange);
        };

        function initJob() {
            vm.jobs = [
                {
                    title: 'Replacement',
                    startTime: '9',
                    endTime: '10',
                    status: vm.status.completed
                },
                {
                    title: 'Replacement',
                    startTime: '7',
                    endTime: '8:30',
                    status: vm.status.pending
                },
                {
                    title: 'Replacement',
                    startTime: '11:30',
                    endTime: '13:30',
                    status: vm.status.unassign
                }];
        }

        function initTimeForDrap() {
            vm.draps = [];
            var hour = vm.startTime;
            var minute = 0;
            var indexLeft = 2;
            for (var i = hour; i < (vm.startTime + vm.sizeHour); i++) {
                vm.draps.push({
                    style: {
                        'left': 12.5 * indexLeft / 2 + '%'
                    },
                    hour: i,
                    minute: minute
                });
                indexLeft++;
                if (minute == 0) {
                    i--;
                    minute = 30;
                    continue;
                }
                if (minute == 30) {
                    minute = 0;
                }

            }
        }

        function initCurrentTime() {
            vm.isShowCurrentTime = timeService.isShowCurrentTime(vm.startTime, vm.sizeHour);
            if (vm.isShowCurrentTime) {
                var left = timeService.getPercentageFromDistance(vm.startTime, timeService.getCurrentTime(), vm.startTime, vm.sizeHour) + 12.5;
                vm.currentTimeStyles = {
                    'left': left - 4 + '%'
                };
            }
        }

        function onTimeChange() {
            initCurrentTime();
            convertJobToRender();
        }

        function convertJobToRender() {
            vm.jobs = timeService.sortByStartTime(vm.jobs);

            var currentPosition = vm.startTime.toString();
            for (var i = 0; i < vm.jobs.length; i++) {
                var distance = timeService.getPercentageFromDistance(vm.jobs[i].startTime, vm.jobs[i].endTime, vm.startTime, vm.sizeHour);
                vm.jobs[i].style = {
                    'width': distance + '%',
                    'left': timeService.getPercentageFromDistance(vm.startTime, vm.jobs[i].startTime, vm.startTime, vm.sizeHour) + 12.5 + '%'
                };
                vm.jobs[i].isDisplay = distance !== 0;
            }
        }
    }
})();