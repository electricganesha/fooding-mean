(function () {

  angular.module('fooding', ['ngRoute','ngTagsInput', 'ui.bootstrap', 'socialLogin']);

  function config ($routeProvider, $locationProvider, socialProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl'
      })
      .when('/events', {
        templateUrl: '/events/events.view.html',
        controller: 'eventsCtrl'
      })
      .when('/profile', {
        templateUrl: '/profile/profile.view.html',
        controller: 'profileCtrl'
      })
      .otherwise({redirectTo: '/'});

      socialProvider.setGoogleKey("416952599363-0bqkju4nen8h6ibe55a3snd1g52umivg.apps.googleusercontent.com");
      socialProvider.setFbKey({appId: "183175235454114", apiVersion: "v2.8"});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  angular
    .module('fooding')
    .config(['$routeProvider', '$locationProvider', 'socialProvider', config])

})();
