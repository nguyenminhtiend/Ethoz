(function () {
    'use strict';

    angular.module('dashboard.module', ['ngRoute'])
        .config(dashboardConfig)
        .controller('DashboardController', DashboardController);

    dashboardConfig.$inject = ['$routeProvider'];

    function dashboardConfig($routeProvider) {
        $routeProvider
            .when('/dashboard', {
                title: 'Dashboard',
                controller: 'DashboardController',
                templateUrl: 'app/views/dashboard/dashboard.html',
                controllerAs: 'vm'
            });
    }

    DashboardController.$inject = ['events', '$rootScope', 'timeService'];
    function DashboardController(events, $rootScope, timeService) {
        var vm = this;
        vm.reAssignDriver = reAssignDriver;
        vm.timeChange = timeChange;
        vm.calendarViewMode = true;
        vm.status = {
            completed: 'completed',
            pending: 'pending',
            unassign: 'unassign'
        };

        vm.onDragComplete = function (data, event) {
            alert('Drag done: ' + data);
        };

        vm.drivers = [];
        for (var i = 0; i < 3; i++) {
            vm.drivers.push({
                id: i,
                name: 'Driver ' + i,
                jobs: [
                    {
                        id: i + '1',
                        title: 'Replacement',
                        startTime: '9',
                        endTime: '10',
                        status: vm.status.completed
                    },
                    {
                        id: i + '2',
                        title: 'Replacement',
                        startTime: '7',
                        endTime: '8:30',
                        status: vm.status.pending
                    },
                    {
                        id: i + '3',
                        title: 'Replacement',
                        startTime: '11:30',
                        endTime: '13:30',
                        status: vm.status.unassign
                    }]
            });
        }
        vm.drivers.push({
            id: 4,
            name: 'Driver ' + 4,
            jobs: [
                {
                    id: 4 + '1',
                    title: 'On Leave Whole Day - 1 Job Assigned',
                    startTime: '4',
                    endTime: '20',
                    status: vm.status.unassign
                }]
        });
        vm.drivers.push({
            id: 5,
            name: 'Driver ' + 5,
            jobs: [
                {
                    id: 5 + '1',
                    title: 'MICE',
                    startTime: '4',
                    endTime: '20',
                    status: vm.status.pending
                }]
        });

        vm.startTime = 7;
        vm.sizeHour = 6;

        function timeChange () {
            reRender();
        }

        function reAssignDriver(job, driverId) {
            for(var i = 0; i < vm.drivers.length; i++) {
                for(var j = 0; j < vm.drivers[i].jobs.length; j++){
                    if( vm.drivers[i].jobs[j].id === job.id) {
                        vm.drivers[i].jobs.splice(j, 1);
                    }
                }
            }
            for(var i = 0; i < vm.drivers.length; i++) {
                if(vm.drivers[i].id === driverId) {
                    vm.drivers[i].jobs.push(job);
                }
            }
            reRender();
        }

        function reRender() {
            for(var i = 0; i < vm.drivers.length; i++) {
                for (var j = 0; j < vm.drivers[i].jobs.length; j++) {
                    var distance = timeService.getPercentageFromDistance(vm.drivers[i].jobs[j].startTime, vm.drivers[i].jobs[j].endTime, vm.startTime, vm.sizeHour);
                    vm.drivers[i].jobs[j].style = {
                        'width': distance + '%',
                        'left': timeService.getPercentageFromDistance(vm.startTime, vm.drivers[i].jobs[j].startTime, vm.startTime, vm.sizeHour) + 12.5 + '%'
                    };
                    vm.drivers[i].jobs[j].isDisplay = distance !== 0;
                }
            }
        }
    }
})();