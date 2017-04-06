var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

// used to serialize the user the session
passport.serializeUser(function(user,done){
  done(null,user.id);
});

//used to deserialize the user
passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
    done(err,user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) {
        return done(null, false,{message: err});
      }

      if(user.provider == "google" || user.provider == "facebook") { 
        return done(null,false, {
          message: 'You have registered with a social network, please log in with a social network'
        }); 
      }

      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));
