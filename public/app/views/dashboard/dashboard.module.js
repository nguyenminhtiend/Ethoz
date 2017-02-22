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

        vm.startTime = 7;
        vm.sizeHour = 6;
    }
})();