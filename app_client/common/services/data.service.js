(function() {

  angular
    .module('fooding')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {

    var setExternalToken = function(token)
    {
      authentication.saveToken(token);
    }

    var removeToken = function()
    {
      authentication.logout();
    }

    var getProfile = function () {
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

    return {
      setExternalToken : setExternalToken,
      removeToken : removeToken,
      getProfile : getProfile,
      setProfile : setProfile
    };
  }

})();
