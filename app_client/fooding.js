(function () {

  angular.module('fooding', ['ngRoute','ngTagsInput', 'ui.bootstrap']);

  function config ($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl'
      })
      .when('/profile', {
        templateUrl: '/profile/profile.view.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  function run($rootScope, $location, authentication, $route) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      alert(event);
      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
        $location.path('/');
      }
    });
  }

  angular
    .module('fooding')
    .config(['$routeProvider', '$locationProvider', config])
    //.run(['$rootScope', '$location', 'authentication', run]);

})();
