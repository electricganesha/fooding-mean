(function() {

  angular
    .module('fooding')
    .service('categoriesData', categoriesData);

  categoriesData.$inject = ['$http', 'authentication'];
  function categoriesData ($http, authentication) {

    var getAppetizers = function () {
      if(authentication.isLoggedIn())
      {
        return $http.get('/api/categories/appetizers', {
            headers: {
                Authorization: 'Bearer '+ authentication.getToken()
            }
        });
      }
      else {
        return false;
      }
    };

    var getDishes = function () {
      if(authentication.isLoggedIn())
      {
        return $http.get('/api/categories/dishes', {
            headers: {
                Authorization: 'Bearer '+ authentication.getToken()
            }
        });
      }
      else {
        return false;
      }
    };

    var getDesserts = function () {
      if(authentication.isLoggedIn())
      {
        return $http.get('/api/categories/desserts', {
            headers: {
                Authorization: 'Bearer '+ authentication.getToken()
            }
        });
      }
      else {
        return false;
      }
    };

    var getDrinks = function () {
      if(authentication.isLoggedIn())
      {
        return $http.get('/api/categories/drinks', {
            headers: {
                Authorization: 'Bearer '+ authentication.getToken()
            }
        });
      }
      else {
        return false;
      }
    };

    return {
      getAppetizers : getAppetizers,
      getDishes : getDishes,
      getDesserts : getDesserts,
      getDrinks : getDrinks
    };
  }

})();