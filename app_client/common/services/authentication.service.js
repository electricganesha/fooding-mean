(function () {

  angular
    .module('fooding')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window', 'socialLoginService'];
  function authentication ($http, $window, socialLoginService) {

    var saveToken = function (token) {
      $window.localStorage['token'] = token;
    };

    var saveUserId = function (id) {
      $window.localStorage['userId'] = id;
    };

    var getToken = function () {
      return $window.localStorage['token'];
    };

    var getUserId = function () {
      return $window.localStorage['userId'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;
      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    var register = function(user) {
      return $http.post('/api/register', user)
        .then(function(data){
          saveToken(data.data.token);
          saveUserId(data.data.userId);
        })
        .catch(function(e) {
          console.log(e);
        });
    };

    var login = function(user) {
      return $http.post('/api/login', user)
        .then(function(data) {
          saveToken(data.data.token);
          saveUserId(data.data.userId);
        })
        .catch(function(e) {
          console.log(e);
        });
    };

    var loginSocial = function(user) {
      return $http.post('/api/loginsocial', user)
        .then(function(data) {
          saveToken(data.data.token);
          saveUserId(data.data.userId);
        })
        .catch(function(e) {
          console.log(e);
        });
    };

    var logout = function() {
      $window.localStorage.removeItem('token');
      $window.localStorage.removeItem('userId');
      socialLoginService.logout();
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      saveUserId : saveUserId,
      getToken : getToken,
      getUserId : getUserId,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      loginSocial : loginSocial,
      logout : logout
    };
  }


})();
