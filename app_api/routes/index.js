var passport = require('passport');
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

router.get('/profile', auth, ctrlProfile.profileRead);
router.post('/profile', ctrlProfile.profileUpdate);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


// Facebook Login
router.get('/fblogin', passport.authenticate('facebook', { session: false, scope: ['email'] }));
router.get('/fblogin/callback', passport.authenticate('facebook', { session: false, failureRedirect: "/" }),
      function(req, res) {
        var token = req.user.generateJwt();
        res.redirect("http://localhost:3000/profile?token="+token);
      }
  );


// Google Login
router.get('/googlelogin', passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/userinfo.email' ,
      'https://www.googleapis.com/auth/userinfo.profile'] }
));
router.get('/googlelogin/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      var token = req.user.generateJwt();
      res.redirect("http://localhost:3000/profile?token="+token);
    }
  );


// Logout
router.get('/logout', function(req, res) {
  console.log("fiz logout");
  req.logout();
  var token = undefined;
  res.redirect('/');
});

module.exports = router;
