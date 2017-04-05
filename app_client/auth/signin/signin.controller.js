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

    //Close modal
    $scope.close = function() {
        $uibModalInstance.close();
    };

    //Submit modal
    $scope.onSubmit = function () {
      if(!$scope.credentials.email || !$scope.credentials.password) {
        alert("All fields are required");
        return;
      } else {
        authentication
          .login($scope.credentials)
          .error(function(err){
            alert(err.message);
          })
          .then(function(){
            $location.path('profile');
          });
      }
    };

    $scope.$on('event:social-sign-in-success', function(event, userDetails){
      console.log(userDetails.token);
      authentication.saveToken(userDetails.token);
      $location.path('profile');
    });

    $scope.$on('event:social-sign-out-success', function(event, logoutStatus){
      console.log(logoutStatus);
    });
  }
})();