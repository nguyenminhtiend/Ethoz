(function () {
    'use strict';

    angular.module('main.module')
        .component('headerPage', {
            bindings: {

            },
            templateUrl: 'app/components/headerPage/headerPage.html',
            controller: HeaderPageController,
            controllerAs: 'vm'

        });

    HeaderPageController.$inject = [];
    function HeaderPageController() {
        var vm = this;
    }
})();