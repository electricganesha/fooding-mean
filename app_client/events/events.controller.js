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

      $scope.eventPopup = function(id){
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl:'/eventpopup/eventpopup.view.html',
            controller: 'eventpopupCtrl',
            resolve: {
              eventId: function() {
                  return id
              }
            },
            size: 'lg'
          });

          modalInstance.result.then(function (selectedItem) {
            console.log(selectedItem);
          }, function () {
          });
      }

      $scope.childHandler = function ($event) {
        $event.stopPropagation();
      };
    }

})();