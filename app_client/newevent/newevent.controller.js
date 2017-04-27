(function() {

  angular
    .module('fooding')
    .controller('newEventCtrl', newEventCtrl);

    newEventCtrl.$inject = ['$scope', 'categoriesData', 'Upload'];
    function newEventCtrl ($scope, categoriesData, Upload) {
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


      /*// upload on file select or drop
      $scope.upload = function (file) {
          console.log(file);
          Upload.upload({
              url: '/img/foonding_covers/',
              data: {file: file}
          }).then(function (resp) {
              console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
          }, function (resp) {
              console.log('Error status: ' + resp.status);
          }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          });
      };*/

      $scope.$watch('files', function () {
          console.log($scope.files);
          $scope.upload($scope.files);
      });
      $scope.$watch('file', function () {
          if ($scope.file != null) {
              $scope.files = [$scope.file]; 
          }
      });
      $scope.log = '';

      $scope.upload = function (files) {
          if (files && files.length) {
              for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                  Upload.upload({
                      url: '/img/foonding_covers/',
                      data: {
                        file: file  
                      }
                  }).then(function (resp) {
                      console.log(files);
                      console.log(document.getElementById("drop-box"));
                      document.getElementById("drop-box").style.backgroundImage = "url('" + file + "')";
                  }, null, function (evt) {
                      var progressPercentage = parseInt(100.0 *
                          evt.loaded / evt.total);
                      $scope.log = 'progress: ' + progressPercentage + 
                        '% ' + evt.config.data.file.name + '\n' + 
                        $scope.log;
                  });
                }
              }
          }
      };


    }

})();