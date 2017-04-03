(function () {

  angular
  .module('fooding')
  .controller('signinCtrl', signinCtrl);

  signinCtrl.$inject = ['$scope', '$location', 'authentication', '$uibModalInstance'];
  function signinCtrl($scope, $location, authentication, $uibModalInstance) {

    $scope.credentials = {
      email : "",
      password : ""
    };

    $scope.close = function() {
        $uibModalInstance.close();
    };

    $scope.onSubmit = function () {
      authentication
        .login($scope.credentials)
        .error(function(err){
          alert(err.message);
        })
        .then(function(){
          $location.path('profile');
        });
    };

    $scope.facebook = function(){

      authentication.loginFacebook().error(function(err){
        alert(err);
      }).
      then(function(){
        $location.path('profile');
      });
    }

    $scope.google = function(){

      authentication.loginGoogle().error(function(err){
        alert(err);
      }).
      then(function(){
        $location.path('profile');
      });
    }

  }

})();