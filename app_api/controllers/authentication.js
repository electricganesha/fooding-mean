var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.provider = "fodding";

  user.setPassword(req.body.password);

  user.save(function(err){
    var token;
    if(err){
      console.log(err);
      sendJSONresponse(res,404,err);
    }
    else {
      token = user.generateJwt();
      sendJSONresponse(res,200, { "token" : token });
    }
  });

};

module.exports.login = function(req, res) {
    passport.authenticate('local', function(err, user, info){
        var token;
        // If Passport throws/catches an error
        if (err) {
          console.log("erro");
          res.status(404).json(err);
          return;
        }
        // If a user is found
        if(user){
          token = user.generateJwt();
          sendJSONresponse(res,200, { "token" : token });
        } else {
          // If user is not found
          res.status(401).json(info);
        }
    })(req, res);

};

module.exports.loginSocial = function(req, res) {
    User.findOne({ 'email' : req.body.email }, function(err, user) {
      if (err) {
        res.status(404).json(err);
        return;
      }
      if (user) {
        if(user.profilePic == "" || user.profilePic == undefined){
          user.profilePic = req.body.imageUrl;
          user.save(function(err,newuser){
            if(err){
              console.log(err); 
            }
          });
        }
        token = user.generateJwt();
        sendJSONresponse(res,200, { "token" : token });
      } else {
          var newUser = new User();
          newUser.email = req.body.email;
          newUser.name = req.body.name;
          newUser.profilePic = req.body.imageUrl;
          newUser.provider = req.body.provider;

          newUser.save(function(err) {
              var token;

              if(err){
                console.log(err);
                sendJSONresponse(res,404,err);
              }
              else {
                token = newUser.generateJwt();
                sendJSONresponse(res,200, { "token" : token });
              }
          });
      }
  });
};
