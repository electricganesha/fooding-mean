(function () {

  angular
    .module('fooding')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window', 'socialLoginService'];
  function authentication ($http, $window, socialLoginService) {

    var saveToken = function (token) {
      $window.localStorage['token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;
      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        console.log(payload.exp > Date.now() / 1000)
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
      return $http.post('/api/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    var login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    var loginSocial = function(user) {
      return $http.post('/api/loginsocial', user).success(function(data) {
        saveToken(data.token);
      });
    };

    var logout = function() {
      $window.localStorage.removeItem('token');
      socialLoginService.logout();
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      loginSocial : loginSocial,
      logout : logout
    };
  }


})();
