(function () {

  angular.module('fooding', ['ngRoute','ngTagsInput', 'ui.bootstrap', 'socialLogin' ,'ui.router']);

  function config ($stateProvider, $urlRouterProvider, $routeProvider, $locationProvider, socialProvider) {

    /*$routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl'
      })
      .when('/events', {
        templateUrl: '/events/events.view.html',
        controller: 'eventsCtrl'
      })
      .when('/myfoodings', {
        templateUrl: '/myevents/myevents.view.html',
        controller: 'myEventsCtrl'
      })
      .when('/profile', {
        templateUrl: '/profile/profile.view.html',
        controller: 'profileCtrl'
      })
      .otherwise({redirectTo: '/'});*/

       $stateProvider
        .state('home', {
          url: '/',
          views: {
            content: {
              templateUrl: '/home/home.view.html',
              controller: 'homeCtrl',
            }
          }
        })
        .state('events', {
          url: '/events',
          views: {
            nav: {
              templateUrl: '/common/directives/navigation/navigation.template.html',
              controller: 'navigationCtrl'
            },
            content: {
              templateUrl: '/events/events.view.html',
              controller: 'eventsCtrl',
            }
          } 
        })
        .state('myfoodings', {
          url: '/myfoodings',
          views: {
            nav: {
              templateUrl: '/common/directives/navigation/navigation.template.html',
              controller: 'navigationCtrl'
            },
            content: {
              templateUrl: '/myevents/myevents.view.html',
              controller: 'myEventsCtrl'
            }
          } 
        })
        .state('profile', {
          url: '/profile',
          views: {
            nav: {
              templateUrl: '/common/directives/navigation/navigation.template.html',
              controller: 'navigationCtrl'
            },
            content: {
              templateUrl: '/profile/profile.view.html',
              controller: 'profileCtrl'
            }
          } 
        });
      $urlRouterProvider.otherwise('/');

      socialProvider.setGoogleKey("416952599363-0bqkju4nen8h6ibe55a3snd1g52umivg.apps.googleusercontent.com");
      socialProvider.setFbKey({appId: "183175235454114", apiVersion: "v2.8"});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  angular
    .module('fooding')
    .config(['$stateProvider', '$urlRouterProvider', '$routeProvider', '$locationProvider', 'socialProvider', config])

})();
