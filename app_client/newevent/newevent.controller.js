(function() {

  angular
    .module('fooding')
    .controller('newEventCtrl', newEventCtrl);

    newEventCtrl.$inject = ['$scope', 'categoriesData'];
    function newEventCtrl ($scope, categoriesData) {
      console.log('New Event controller is running');

      $scope.selected = [];

      $scope.slideIn = "slideOut";

      $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
          list.splice(idx, 1);
        }
        else {
          list.push(item);
        }
      };

      $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
      };

      $scope.slide = function () {
        if($scope.slideIn == "slide") {
          $scope.slideIn = "slideOut";
        }else{
          $scope.slideIn= "slide";
        }
      };

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