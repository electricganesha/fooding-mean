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
var ctrlSkills = require('../controllers/skill');

router.get('/profile', auth, ctrlProfile.profileRead);
router.post('/profile', ctrlProfile.profileUpdate);

//skills
router.get('/skills', ctrlSkills.skillsGetAll);
router.get('/skillsByName', ctrlSkills.skillsGetAllByName);
router.post('/skills', ctrlSkills.skillsCreate);

/**
** TODO
**/
/*router.get('/skills/:skillid', ctrlSkills.skillsGetOne);
router.put('/skills/:skillid', ctrlSkills.skillsUpdateOne);
router.delete('/skills/:skillid', ctrlSkills.skillsDeleteOne);*/

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
// Facebook Login
router.get('/fblogin', passport.authenticate('facebook', { session: false, scope: [] }));

router.get('/fblogin/callback', passport.authenticate('facebook', { session: false, failureRedirect: "/" }),
       function(req, res) {
        var token = req.user.generateJwt();
        res.redirect("http://localhost:3000/profile?token="+token);
       }
   );

router.get('/googlelogin', passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/userinfo.email' ,
      'https://www.googleapis.com/auth/userinfo.profile'] }
));

// the callback after google has authenticated the user
router.get('/googlelogin/callback',
passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req.user);
    // Authenticated successfully
    var token = req.user.generateJwt();

    res.redirect("http://localhost:3000/profile?token="+token);
  });


   // route for logging out
router.get('/logout', function(req, res) {
  console.log("fiz logout");
  req.logout();
  var token = undefined;
  res.redirect('/');
});

module.exports = router;
