(function() {

  angular
    .module('fooding')
    .controller('newEventCtrl', newEventCtrl);

    newEventCtrl.$inject = ['$scope', 'categoriesData'];
    function newEventCtrl ($scope, categoriesData) {
      console.log('New Event controller is running');

          /*var setHeight = document.getElementById("appetizersIcons").height;
          console.log(setHeight);
          document.getElementById("appetizersText").style.height = setHeight;*/

      categoriesData.getAppetizers()
        .then(function (data){
          $scope.appetizers = data.data;
        },function (error){
          $scope.message = "Sorry, something's gone wrong, please try again later";
        });

      categoriesData.getDishes()
        .then(function (data){
          $scope.dishes = data.data;
        },function (error){
          $scope.message = "Sorry, something's gone wrong, please try again later";
        });

      categoriesData.getDesserts()
        .then(function (data){
          $scope.desserts = data.data;
        },function (error){
          $scope.message = "Sorry, something's gone wrong, please try again later";
        });

      categoriesData.getDrinks()
        .then(function (data){
          $scope.drinks = data.data;
        },function (error){
          $scope.message = "Sorry, something's gone wrong, please try again later";
        });


    }

})();