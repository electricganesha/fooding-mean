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

router.get('/profile', auth, ctrlProfile.profileRead);
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
/*router.get('/getBestProjects', ctrlProjects.getBestProjects); //get last 6 best projects
router.get('/getProjectsByCategory/:category', ctrlProjects.getProjectsByCategory); //get last 6 best projects
router.get('/getProjectsBySubCategory/:subcategories', ctrlProjects.getProjectsBySubCategory); //get last 6 best projects
router.put('/projects/:projectId', ctrlProjects.projectsUpdateOne); //edit project by id
router.delete('/projects/:projectId', ctrlProjects.projectsDeleteOne); //delete project by id*/

// Categories
router.get('/categories', auth, ctrlEvents.eventList); //get all events
router.post('/categories', ctrlEvents.eventCreate); //create a new event


// Logout
router.get('/logout', function(req, res) {
  console.log("fiz logout");
  req.logout();
  var token = undefined;
  res.redirect('/');
});

module.exports = router;
