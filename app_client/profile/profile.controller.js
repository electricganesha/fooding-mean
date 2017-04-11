(function() {

  angular
  .module('fooding')
  .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$scope','$route','$location','$http','foodingData', '$window','authentication'];
  function profileCtrl($scope, $route, $location, $http, foodingData, $window, authentication) {

    if(authentication.isLoggedIn()) {
        foodingData.getProfile()
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

    $scope.logout = function()
    {
      foodingData.removeToken();
      window.location = $window.location.protocol + "//" + $window.location.host + "/api/logout";
    }

    $scope.loadTags = function(query) {

      var response;

      return $http.get('/api/skillsByName');
    };

    $scope.saveProfile = function()
    {
      foodingData.setProfile($scope.profile)
      .success(function(data) {
        console.log(data);
      });
    };
  }

})();
