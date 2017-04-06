(function() {

  angular
  .module('fooding')
  .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$scope','$route','$location','$http','foodingData', '$window','authentication'];
  function profileCtrl($scope, $route, $location, $http, foodingData, $window, authentication) {

    $scope.pageLoaded = false;

    if($route.current.params.token == undefined && !authentication.isLoggedIn())
    {
      window.location = $window.location.protocol + "//" + $window.location.host + "/";
    }
    else {
      if($route.current.params.token != undefined)
      {
        foodingData.setExternalToken($route.current.params.token);
      }

      $scope.user = {};

      foodingData.getProfile()
      .success(function(data) {
        $scope.user = data;
        $scope.pageLoaded = true;

        $scope.profile = {
          email:  $scope.user.email,
          fullname: $scope.user.name,
        }

        $scope.profile.tags = [];
      })
      .error(function (e) {
        console.log(e);
      });
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
