(function () {

  angular
    .module('fooding')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$scope', '$location', 'authentication', '$uibModalInstance'];
  function registerCtrl($scope, $location, authentication, $uibModalInstance) {
      console.log("Register controller running");

      $scope.credentials = {
        name : "",
        email : "",
        password : ""
      };

      //Close modal
      $scope.close = function() {
          $uibModalInstance.close();
      };
      
      //Submit modal
      $scope.onSubmit = function () {
          if(!$scope.credentials.name || !$scope.credentials.email || !$scope.credentials.password) {
            alert("All fields are required");
            return;
          } else {
            authentication
              .register($scope.credentials)
              .error(function(err){
                alert(err.message);
              })
              .then(function(){
                $location.path('events');
              });
          }
      };

      $scope.$on('event:social-sign-in-success', function(event, userDetails){
        authentication
            .loginSocial(userDetails)
            .error(function(err){
              alert(err.message);
            })
            .then(function(){
              $location.path('events');
            });
      });

      $scope.$on('event:social-sign-out-success', function(event, logoutStatus){
        console.log(logoutStatus);
      });

  }

})();