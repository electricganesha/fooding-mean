var express = require('express');
var router = express.Router();

var ctrlAuth = require('../controllers/authentication');
var ctrlEvents = require('../controllers/events');
var ctrlCategories = require('../controllers/categories');

//authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//events
router.get('/events', ctrlEvents.eventsList); //get all events
router.post('/events', ctrlEvents.eventsCreate); //create a new event
router.get('/events/:eventId', ctrlEvents.eventsReadOne); //get event by id
router.put('/events/:eventId', ctrlEvents.eventsUpdateOne); //edit event by id
router.delete('/events/:eventId', ctrlEvents.eventsDeleteOne); //delete event by id

//categories
router.get('/categories', ctrlCategories.categoryList); //get all events
router.post('/categories', ctrlCategories.categoryCreate); //create a new event
router.get('/categories/:categoryId', ctrlCategories.categoryReadOne); //get event by id
router.put('/categories/:categoryId', ctrlCategories.categoryUpdateOne); //edit event by id
router.delete('/categories/:categoryId', ctrlCategories.categoryDeleteOne); //delete event by id

module.exports = router;
