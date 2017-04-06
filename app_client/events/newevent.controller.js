(function() {

  angular
    .module('fooding')
    .controller('newEventCtrl', newEventCtrl);

    newEventCtrl.$inject = ['$scope', '$uibModal', 'foodingData'];
    function newEventCtrl ($scope, $uibModal, foodingData) {
      console.log('New Event controller is running');

      

    }

})();