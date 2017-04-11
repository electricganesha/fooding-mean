(function() {

  angular
    .module('fooding')
    .controller('navigationCtrl', navigationCtrl);

    navigationCtrl.$inject = ['$scope', '$uibModal', 'foodingData', 'authentication'];
    function navigationCtrl ($scope, $uibModal, foodingData, authentication) {
      console.log('Navigation controller is running');

      if(authentication.isLoggedIn()) {
        foodingData.getProfile()
        .then(function(data) {
            $scope.name = data.data.name;
            $scope.profilePic = data.data.profilePic;
            $scope.stars = data.data.stars;
            $scope.upVotes = data.data.upVotes;
            $scope.downVotes = data.data.downVotes;
        })
        .catch(function (e) {
            console.log(e);
        });
      } else {
        return false;
      }

       $scope.newEventPopup = function () {
        $uibModal.open({
          templateUrl:'/events/newevent.view.html',
          controller: 'newEventCtrl',
          size: 'lg'
        })
      }

    }

})();