(function() {

  angular
  .module('fooding')
  .controller('userCtrl', userCtrl);

  userCtrl.$inject = ['$scope','$route','$stateParams','$http','foodingData','authentication'];
  function userCtrl($scope, $route, $stateParams, $http, foodingData, authentication) {
    console.log('User profile controller is running');
    
    if(authentication.isLoggedIn()) {
        foodingData.getUserProfile($stateParams.userId)
        .then(function(data) {
            $scope.name = data.data.name;
            $scope.email = data.data.email;
        })
        .catch(function (e) {
            console.log(e);
        });
      } else {
        return false;
    }
  }

})();