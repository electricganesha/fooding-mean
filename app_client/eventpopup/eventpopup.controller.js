(function () {

  angular
    .module('fooding')
    .controller('eventpopupCtrl', eventpopupCtrl);

  eventpopupCtrl.$inject = ['$scope', '$location', 'authentication', 'foodingData', '$uibModalInstance', 'eventId'];
  function eventpopupCtrl($scope, $location, authentication, foodingData, $uibModalInstance, eventId) {
      console.log("Event Popup controller running");

      foodingData.getEventById(eventId)
      .then(function (data){
        $scope.event = data.data[0];
      },function (error){
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });
      //Close modal
      $scope.close = function() {
          $uibModalInstance.close();
      };

  }

})();