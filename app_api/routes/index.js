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

// Logout
router.get('/logout', function(req, res) {
  console.log("fiz logout");
  req.logout();
  var token = undefined;
  res.redirect('/');
});

module.exports = router;
