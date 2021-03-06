(function() {

  angular
    .module('fooding')
    .service('foodingData', foodingData);

  foodingData.$inject = ['$http', 'authentication'];
  function foodingData ($http, authentication) {

    var setExternalToken = function(token)
    {
      authentication.saveToken(token);
    }

    var removeToken = function()
    {
      authentication.logout();
    }

    var getMyProfile = function () {
      if(authentication.isLoggedIn())
      {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
      }
      else {
        return false;
      }
    };

    var getUserProfile = function (userId) {
      if(authentication.isLoggedIn())
      {
      return $http.get('/api/profile/' + userId, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
      }
      else {
        return false;
      }
    };

    var setProfile = function(dataToSend)
    {
      if(authentication.isLoggedIn())
      {
        return $http.post('/api/profile', {
          headers: {
            Authorization: 'Bearer '+ authentication.getToken()
          },
          profileDataUpdate: dataToSend
        });
        }
        else {
          return false;
        }
    };

    var getAllEvents = function(dataToSend)
    {
      if(authentication.isLoggedIn()) {
        return $http.get('/api/events', {
          headers: {
            Authorization: 'Bearer '+ authentication.getToken()
          }
        });
      } else {
        return false;
      }
    };

    var getAllEventsFromUser = function(id)
    {
      if(authentication.isLoggedIn()) {
        return $http.get('/api/events/' + id, {
          headers: {
            Authorization: 'Bearer '+ authentication.getToken()
          }
        });
      } else {
        return false;
      }
    };

    var getEventById = function(id)
    {
      if(authentication.isLoggedIn()) {
        return $http.get('/api/event/' + id, {
          headers: {
            Authorization: 'Bearer '+ authentication.getToken()
          }
        });
      } else {
        return false;
      }
    };

    return {
      setExternalToken : setExternalToken,
      removeToken : removeToken,
      getMyProfile : getMyProfile,
      getUserProfile : getUserProfile,
      setProfile : setProfile,
      getAllEvents : getAllEvents,
      getAllEventsFromUser : getAllEventsFromUser,
      getEventById : getEventById
    };
  }

})();
