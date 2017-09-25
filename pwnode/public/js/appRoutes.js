// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // epl page that will use the EPLController
        .when('/epl', {
            templateUrl: 'views/epl.html',
            controller: 'EPLController'
        })
        
        //about page that will use the AboutController
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutController'
        });

    $locationProvider.html5Mode(true);

}]);