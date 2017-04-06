var mongoose = require('mongoose');
var Event = mongoose.model('Events');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.eventList = function(req, res) {
  Event.find({}).sort('-dateOfEvent').exec(function(err, events) {
    res.json(events);
  });
};

module.exports.eventCreate = function(req, res) {
  Event.create({
    dateOfEvent:  new Date(req.body.dateOfEvent),
    owner: req.body.owner,
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    category: req.body.categories,
    menu: req.body.menu,
    coverPhoto: req.body.coverphoto,
    attendeeLimit : req.body.attendeelimit,
    attendees: req.body.attendees,
    photos: req.body.photos,
    wall: req.body.wall,
    reviews: req.body.reviews,
    stars : req.body.stars
  }, function(err, project) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      sendJSONresponse(res, 201, project);
    }
  });
};