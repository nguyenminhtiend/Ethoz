(function () {
    'use strict';

    angular.module('main.module')
        .component('filterDashboard', {
            bindings: {

            },
            templateUrl: 'app/components/dashboard/filterDashboard/filterDashboard.html',
            controller: FilterDashboardController,
            controllerAs: 'vm'

        });

    FilterDashboardController.$inject = [];
    function FilterDashboardController() {
        var vm = this;

        vm.$onInit = function() {

        };
    }
})();