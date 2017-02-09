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

    DashboardController.$inject = [];
    function DashboardController() {
        var vm = this;

        vm.onDragComplete = function (data, event) {
            alert('Drag done: ' + data);
        };

        vm.startTime = 10;
        vm.sizeHour = 6;
        vm.options = {
            minDate: new Date(),
            showWeeks: false,
            formatDayTitle: 'dd MMM yyyy'
        };

        vm.todayJobs = [
            {
                type: 'Replacement',
                sendTo: '120 Ubi Ave 3, Singapore 6623463',
                movementVoucher: 3
            },
            {
                type: 'Test Drive',
                sendTo: '120 Ubi Ave 3, Singapore 6623463',
                movementVoucher: 3
            },
            {
                type: 'Replacement',
                sendTo: '120 Ubi Ave 3, Singapore 6623463',
                movementVoucher: 3
            }
        ];
    }
})();