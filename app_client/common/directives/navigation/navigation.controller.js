(function() {

  angular
    .module('fooding')
    .controller('navigationCtrl', navigationCtrl);

    navigationCtrl.$inject = ['$scope', '$uibModal'];
    function navigationCtrl ($scope, $uibModal) {
      console.log('Navigation controller is running');

       $scope.newEventPopup = function () {
        $uibModal.open({
          templateUrl:'/events/newevent.view.html',
          controller: 'newEventCtrl',
          size: 'lg'
        })
      }

    }

})();