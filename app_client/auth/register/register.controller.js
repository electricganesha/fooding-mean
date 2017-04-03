(function () {

  angular
    .module('fooding')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$scope', '$location', 'authentication', '$uibModalInstance'];
  function registerCtrl($scope, $location, authentication, $uibModalInstance) {
    console.log("ola");
    $scope.credentials = {
      name : "",
      email : "",
      password : ""
    };

    $scope.close = function() {
        $uibModalInstance.close();
    };

    $scope.onSubmit = function () {
      console.log('Submitting registration');
      authentication
        .register($scope.credentials)
        .error(function(err){
          alert(err.message);
        })
        .then(function(){
          $location.path('profile');
        });
    };

  }

})();