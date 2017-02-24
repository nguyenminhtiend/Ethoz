(function () {
    'use strict';

    angular.module('main.module')
        .component('driverChartTime', {
            bindings: {
                driver: '=',
                startTime: '=',
                sizeHour: '<',
                isTaskActive: '<',
                reAssignDriver: '&'
            },
            templateUrl: 'app/components/dashboard/driverChartTime/driverChartTime.html',
            controller: DriverChartTimeController,
            controllerAs: 'vm'

        });

    DriverChartTimeController.$inject = ['$scope', 'timeService', '$timeout'];
    function DriverChartTimeController($scope, timeService, $timeout) {
        var vm = this;

        vm.$onInit = function () {
            initCurrentTime();
            convertJobToRender();
            initTimeForDrap();
            $scope.$watch("vm.startTime", onTimeChange);
        };

        vm.status = {
            completed: 'completed',
            pending: 'pending',
            unassign: 'unassign'
        };

        vm.onDropComplete = function (data, event, drap, driverId) {
            if(!data){
                return;
            }
            var job = angular.copy(data);
            var startTime = drap.hour + ':' + drap.minute;
            var endTime = drap.hour + 1 + ':' + drap.minute;
            job.startTime = startTime;
            job.endTime = endTime;
            vm.reAssignDriver({job: job, driverId: driverId});
        };

        vm.drapComplete = function (jobId) {
            for(var i = 0; i  < vm.driver.jobs.length; i++) {
                if(vm.driver.jobs[i].id === jobId) {
                    vm.driver.jobs.splice(i, 1);
                    convertJobToRender();
                    return;
                }
            }
        };



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
            for (var i = 0; i < vm.driver.jobs.length; i++) {
                var distance = timeService.getPercentageFromDistance(vm.driver.jobs[i].startTime, vm.driver.jobs[i].endTime, vm.startTime, vm.sizeHour);
                vm.driver.jobs[i].style = {
                    'width': distance + '%',
                    'left': timeService.getPercentageFromDistance(vm.startTime, vm.driver.jobs[i].startTime, vm.startTime, vm.sizeHour) + 12.5 + '%'
                };
                vm.driver.jobs[i].isDisplay = distance !== 0;
            }
        }
    }
})();