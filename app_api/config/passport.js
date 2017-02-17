var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use( new LocalStrategy({
  usernameField: 'email'
  },
  function(username, password, done)
  {
    User.findOne({ email: username}, function(err,user)
  {
    if(err) { return done(err);}
    if(!user)
    {
      return done(null, false, {
        message: 'This username doesnt exist. Please try another one.'
      });
    }
    if(!user.validPassword(password))
    {
      return done(null, false, {
        message: 'Incorrect password.'
      });
    }
    return done(null, user);
    });
  }
));

passport.use( new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/api/auth/facebook/callback",
  profileFields: ['id','displayName','name', 'photos', 'emails']
  },
  function(accessToken, refreshToken, profile, done)
  {
    User.findOne({'email':profile.emails[0].value}, function(err,user)
    {
      if (err)
      {
        return done(err);
      }
      if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password:null,
                    provider:'_facebook',
                    //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                    profileBLOB: profile._json
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                //found user. Return
                return done(err, user);
            }
    });
  }
));

passport.use( new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done)
  {
    console.log("entrou no google auth");
    console.log(accessToken);
    User.findOne({'email':profile.emails[0].value}, function(err,user)
    {
      if (err)
      {
        return done(err);
      }

      console.log(profile._json);

      if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password:null,
                    provider:'_google',
                    //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                    profileBLOB: profile._json
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    console.log("criou user novo " + user);
                    return done(err, user);
                });
            } else {
                //found user. Return
                console.log("user ja existe " + user);
                return done(err, user);
            }
    });
  }
))
