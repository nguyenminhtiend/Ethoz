(function () {
    'use strict';

    angular.module('main.module')
        .component('dateControl', {
            bindings: {

            },
            templateUrl: 'app/components/dashboard/dateControl/dateControl.html',
            controller: DateControlController,
            controllerAs: 'vm'

        });

    DateControlController.$inject = ['$filter'];
    function DateControlController($filter) {
        var vm = this;
        vm.next = next;
        vm.previous = previous;

        vm.$onInit = function() {
            vm.currentDate = new Date();
            getDateFormat();
        };

        function next() {
            vm.currentDate.setDate(vm.currentDate.getDate() + 1);
            getDateFormat();
        }

        function previous() {
            vm.currentDate.setDate(vm.currentDate.getDate() - 1);
            getDateFormat();
        }

        function getDateFormat() {
            var dateFormat = checkIsToDay(vm.currentDate) ? 'Today' : $filter('date')(vm.currentDate, 'EEE');
            vm.dateFormat = dateFormat + ', ' + getOrdinalDay(vm.currentDate.getDate()) + ' ' + $filter('date')(vm.currentDate, 'MMM') + ', ' + vm.currentDate.getFullYear();
        }

        function checkIsToDay(date) {
            var todaysDate = new Date();
            return date.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0);
        }

        function getOrdinalDay(day) {
            if(day % 20 == 1 || day % 30 == 1) {
                return day + 'st';
            }
            if(day % 20 == 2 || day % 30 == 2) {
                return day + 'nd';
            }
            if(day % 20 == 3 || day % 30 == 3) {
                return day + 'rd';
            }
            return day + 'th';
        }
    }
})();