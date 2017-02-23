(function () {
    'use strict';

    angular.module('main.module', ['ngRoute', 'ui.bootstrap', 'ngMap', 'ngDraggable', 'ui.bootstrap.contextMenu', 'dashboard.module'])
        //.config(compileConfig)
        //.config(httpConfig)
        .config(routeConfig)
        .run(appRun);

    // compileConfig.$inject = ['$compileProvider', 'systemSetting'];
    // function compileConfig($compileProvider, systemSetting) {
    //     if (!systemSetting.isLocal) {
    //         $compileProvider.debugInfoEnabled(false); // Production-only flag for best performance
    //     }
    // }
    //
    // httpConfig.$inject = ['$httpProvider'];
    // function httpConfig($httpProvider) {
    //     $httpProvider.interceptors.push('httpInterceptor');
    // }

    routeConfig.$inject = ['$routeProvider', '$locationProvider'];
    function routeConfig($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/', {
                redirectTo: '/dashboard'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    appRun.$inject = ['$rootScope', '$route', '$location'];
    function appRun($rootScope, $route, $location) {

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // var nextPath = $location.path(),
            //     nextRoute = $route.routes[nextPath];
            // if (!nextRoute || !nextRoute.authorize) {
            //     return;
            // }
            // if (!authService.isAuthenticated()) {
            //     $location.path('/login');
            //     return;
            // }
            // if (!authService.isAuthorized(nextRoute.authorize)) {
            //     $location.path('/login');
            // }
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            if (!$route.current.title) {
                document.title = 'Ethoz';
            } else {
                document.title = 'Ethoz - ' + $route.current.title;
            }
        });
    }
})();