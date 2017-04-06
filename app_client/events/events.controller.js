(function() {

  angular
    .module('fooding')
    .controller('eventsCtrl', eventsCtrl);

    eventsCtrl.$inject = ['$scope', '$uibModal', 'foodingData'];
    function eventsCtrl ($scope, $uibModal, foodingData) {
      console.log('Events controller is running');

      foodingData.getAllEvents()
      .then(function (data){
        console.log(data.data);
        $scope.events = data.data;
      },function (error){
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });

    }

})();