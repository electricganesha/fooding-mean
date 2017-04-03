(function() {

  angular
  .module('fooding')
  .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$scope','$route','$location','$http','meanData', '$window','authentication'];
  function profileCtrl($scope, $route,$location,$http, meanData, $window, authentication) {

    $scope.pageLoaded = false;

    if($route.current.params.token == undefined && !authentication.isLoggedIn())
    {
      window.location = $window.location.protocol + "//" + $window.location.host + "/";
    }
    else {
      if($route.current.params.token != undefined)
      {
        meanData.setExternalToken($route.current.params.token);
      }

      var vm = this;

      vm.user = {};

      meanData.getProfile()
      .success(function(data) {
        vm.user = data;
        $scope.pageLoaded = true;

        console.log(vm.user.skills);

        $scope.profile = {
          email:  vm.user.email,
          fullname: vm.user.name,
          nickname: vm.user.nickname,
          address: vm.user.address,
          nif:vm.user.nif,
          telephone:vm.user.telephone,
          tags:vm.user.skills,
          paymentmethod:'nib'
        }

        $scope.profile.tags = [];
      })
      .error(function (e) {
        console.log(e);
      });
    }

    vm.logout = function()
    {
      meanData.removeToken();
      $route.current.params.token = "";
      window.location = $window.location.protocol + "//" + $window.location.host + "/api/logout";
    }

    $scope.loadTags = function(query) {

      var response;

      return $http.get('/api/skillsByName');
    };

    $scope.saveProfile = function()
    {
      meanData.setProfile($scope.profile)
      .success(function(data) {
        console.log(data);
      });
    };
  }

})();
