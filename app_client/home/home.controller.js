(function() {

  angular
    .module('fooding')
    .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', '$location', 'authentication', '$uibModal'];
    function homeCtrl ($scope, $location, authentication, $uibModal) {
      console.log('Home controller is running');

      if(authentication.getToken() != undefined) {
        $location.path('profile');
      }

      $scope.loginPopup = function () {
        $uibModal.open({
          templateUrl:'/auth/signin/signin.view.html',
          controller: 'signinCtrl'
        })
      };

      $scope.registerPopup = function () {
        $uibModal.open({
          templateUrl:'/auth/register/register.view.html',
          controller: 'registerCtrl'
        })
      }
    }

})();
