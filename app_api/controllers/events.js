var mongoose = require('mongoose');
var Event = mongoose.model('Events');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.eventList = function(req, res) {
  Event.find({}).populate('owner').sort('-dateOfEvent').exec(function(err, events) {
    res.json(events);
  });
};

module.exports.eventCreate = function(req, res) {
  Event.create({
    startDate:  new Date(req.body.startDate),
    endDate:  new Date(req.body.endDate),
    owner: req.body.owner,
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    category: req.body.categories,
    menu: req.body.menu,
    coverPhoto: req.body.coverphoto,
    attendeeLimit : req.body.attendeelimit
  }, function(err, project) {
    if (err) {
      sendJSONresponse(res, 400, err);
    } else {
      sendJSONresponse(res, 201, project);
    }
  });
};

/* GET a project by its id */
module.exports.eventByUserId = function(req, res) {
  if (req.params && req.params.userId) {
    Event.find({owner: req.params.userId})
    .sort('-dateOfEvent')
    .exec(function(err, events) {
      if (!events) {
        sendJSONresponse(res, 404, {
          "message": "User Id not found"
        });
        return;
      } else if (err) {
        sendJSONresponse(res, 404, err);
        return;
      }
      sendJSONresponse(res, 200, events);
    });
  } else {
    sendJSONresponse(res, 404, {
      "message": "No user id in request"
    });
  }
};

module.exports.eventReadOne = function(req, res) {
  console.log(req.params.eventId);
  if (req.params && req.params.eventId) {
    Event.find({_id: req.params.eventId})
    .populate('owner')
    .populate('attendees')
    .exec(function(err, events) {
      if (!events) {
        sendJSONresponse(res, 404, {
          "message": "Event Id not found"
        });
        return;
      } else if (err) {
        sendJSONresponse(res, 404, err);
        return;
      }
      console.log(events[0]);
      sendJSONresponse(res, 200, events);
    });
  } else {
    sendJSONresponse(res, 404, {
      "message": "No event id in request"
    });
  }
};