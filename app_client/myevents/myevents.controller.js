(function() {

  angular
    .module('fooding')
    .controller('myEventsCtrl', myEventsCtrl);

    myEventsCtrl.$inject = ['$scope', '$uibModal', 'authentication', 'foodingData'];
    function myEventsCtrl ($scope, $uibModal, authentication, foodingData) {
      console.log('My events controller is running');
      
      foodingData.getAllEventsFromUser(authentication.getUserId())
      .then(function (data){
        $scope.events = data.data;
      },function (error){
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });

    }

})();