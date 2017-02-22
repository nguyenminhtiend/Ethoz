(function () {
    'use strict';

    angular.module('main.module')
        .component('jobTab', {
            bindings: {

            },
            templateUrl: 'app/components/dashboard/jobTab/jobTab.html',
            controller: JobTabController,
            controllerAs: 'vm'

        });

    JobTabController.$inject = [];
    function JobTabController() {
        var vm = this;

        vm.$onInit = function() {
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
        };
    }
})();