(function() {

  angular
    .module('fooding')
    .controller('newEventCtrl', newEventCtrl);

    newEventCtrl.$inject = ['$scope', 'categoriesData', 'Upload'];
    function newEventCtrl ($scope, categoriesData, Upload) {
      console.log('New Event controller is running');

      var eventJson = [];

      $scope.onTimeSet = function (newDate, oldDate) {
          console.log(newDate);
          console.log(oldDate);
      }

      $scope.selectedAppetizers = [];
      $scope.selectedDishes = [];
      $scope.selectedDesserts = [];
      $scope.selectedDrinks = [];

      $scope.first = true;
      $scope.second = false;
      $scope.third = false;

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

      $scope.firstNext = function () {
        $scope.first = false;
        $scope.second = true;
      };

      $scope.secondNext = function () {
        $scope.second = false;
        $scope.third = true;
      };

      $scope.secondBack = function () {
        $scope.first = true;
        $scope.second = false;
      };

      $scope.thirdBack = function () {
        $scope.second = true;
        $scope.third = false;
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

      $scope.$watch('files', function () {
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
                  console.log(file);
                  Upload.upload({
                      url: '/api/eventcover',
                      method: 'POST',
                      data: {
                        file: file  
                      }
                  }).then(function (resp) {
                      console.log(resp);
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

      $scope.today = function() {
        $scope.dt = new Date();
      };
      $scope.today();

      $scope.clear = function() {
        $scope.dt = null;
      };

      $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
      };

      $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1,
        showWeeks: false
      };

      // Disable weekend selection
      function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      }

      $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
      };

      $scope.toggleMin();

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
      $scope.altInputFormats = ['M!/d!/yyyy'];

      $scope.popup1 = {
        opened: false
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      $scope.events = [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

      function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }

        return '';
      }
      
      $scope.submit = function() {
        eventJson.menu = [];
        if($scope.selectedAppetizers.length != 0){
          eventJson.menu.appetizers = [];
          for (i=0; i<$scope.selectedAppetizers.length; i++){
            eventJson.menu.appetizers[i] = document.getElementsByName($scope.selectedAppetizers[i])[0].value;
          }
        }
        if($scope.selectedDishes.length != 0){
          eventJson.menu.dishes = [];
          for (i=0; i<$scope.selectedDishes.length; i++){
            eventJson.menu.dishes[i] = document.getElementsByName($scope.selectedDishes[i])[0].value;
          }
        }
        if($scope.selectedDesserts.length != 0){
          eventJson.menu.desserts = [];
          for (i=0; i<$scope.selectedDesserts.length; i++){
            eventJson.menu.desserts[i] = document.getElementsByName($scope.selectedDesserts[i])[0].value;
          }
        }
        if($scope.selectedDrinks.length != 0){
          eventJson.menu.drinks = [];
          for (i=0; i<$scope.selectedDrinks.length; i++){
            eventJson.menu.drinks[i] = document.getElementsByName($scope.selectedDrinks[i])[0].value;
          }
        }
        eventJson.title = document.getElementsByName("eventTitle")[0].value;
        eventJson.description = document.getElementsByName("eventDescription")[0].value;
        console.log(document.getElementsByName("eventDescription")[0].value);
        console.log(eventJson);
      };


    }

})();