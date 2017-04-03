(function() {

  angular
    .module('fooding')
    .controller('eventsCtrl', eventsCtrl);

    eventsCtrl.$inject = ['$scope', '$uibModal'];
    function eventsCtrl ($scope, $uibModal) {
      console.log('Events controller is running');
    }

})();