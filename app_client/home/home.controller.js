(function() {

  angular
    .module('fooding')
    .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', '$uibModal'];
    function homeCtrl ($scope, $uibModal) {
      console.log('Home controller is running');

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
