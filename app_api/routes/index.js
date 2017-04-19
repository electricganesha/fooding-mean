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
var ctrlEvents = require('../controllers/events');
var ctrlCategories = require('../controllers/categories');

// User
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/profile/:userId', auth, ctrlProfile.profileReadOne);
router.post('/profile', ctrlProfile.profileUpdate);

// Authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/loginsocial', ctrlAuth.loginSocial);

// Events
router.get('/events', auth, ctrlEvents.eventList); //get all events
router.post('/events', ctrlEvents.eventCreate); //create a new event
router.get('/events/:userId', auth, ctrlEvents.eventByUserId); //get all events from user id
router.get('/event/:eventId', auth, ctrlEvents.eventReadOne); //get project by id and owner information

// Categories
router.get('/categories/appetizers', auth, ctrlCategories.appetizers); //Get categories by subcategory appetizers
router.get('/categories/dishes', auth, ctrlCategories.dishes); //Get categories by subcategory dishes
router.get('/categories/desserts', auth, ctrlCategories.desserts); //Get categories by subcategory desserts
router.get('/categories/drinks', auth, ctrlCategories.drinks); //Get categories by subcategory drinks

// Logout
router.get('/logout', function(req, res) {
  console.log("fiz logout");
  req.logout();
  var token = undefined;
  res.redirect('/');
});

module.exports = router;
