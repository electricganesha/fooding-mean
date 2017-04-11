(function() {

  angular
    .module('fooding')
    .controller('eventsCtrl', eventsCtrl);

    eventsCtrl.$inject = ['$scope', '$location', '$uibModal', 'foodingData', 'authentication'];
    function eventsCtrl ($scope, $location, $uibModal, foodingData, authentication) {
      console.log('Events controller is running');

      if(authentication.getToken() == undefined) {
        $location.path('home');
      }

      foodingData.getAllEvents()
      .then(function (data){
        $scope.events = data.data;
      },function (error){
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });

    }

})();