var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var passport = require('passport');

var auth = jwt({
  secret:process.env.JWT_SECRET,
  userProperty:
  'payload',
});

var ctrlAuth = require('../controllers/authentication');
var ctrlEvents = require('../controllers/events');
var ctrlCategories = require('../controllers/categories');

//authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}));
router.get('/auth/facebook/callback',  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
router.get('/auth/google', passport.authenticate('google', { scope: [ 'https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.profile']  }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) { res.redirect('/'); });

//events
router.get('/events', ctrlEvents.eventsList); //get all events
router.post('/events', auth, ctrlEvents.eventsCreate); //create a new event
router.get('/events/:eventId', ctrlEvents.eventsReadOne); //get event by id
router.put('/events/:eventId', auth, ctrlEvents.eventsUpdateOne); //edit event by id
router.delete('/events/:eventId', auth, ctrlEvents.eventsDeleteOne); //delete event by id

//categories
router.get('/categories', auth, ctrlCategories.categoryList); //get all events
router.post('/categories', auth, ctrlCategories.categoryCreate); //create a new event
router.get('/categories/:categoryId', auth, ctrlCategories.categoryReadOne); //get event by id
router.put('/categories/:categoryId', auth, ctrlCategories.categoryUpdateOne); //edit event by id
router.delete('/categories/:categoryId', auth, ctrlCategories.categoryDeleteOne); //delete event by id

module.exports = router;
