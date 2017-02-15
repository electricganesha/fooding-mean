var mongoose = require('mongoose');
var thisEventInstance = mongoose.model('Event');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET list of events */
module.exports.eventsList = function(req, res) {
    thisEventInstance.find({}, function(err, aEvent) {
       res.json(aEvent);
  });
};

/* GET an event by its id */
module.exports.eventsReadOne = function(req, res) {
  console.log('Finding event details', req.params);
  if (req.params && req.params.eventId) {
    thisEventInstance
      .findById(req.params.eventId)
      .exec(function(err, aEvent) {
        if (!aEvent) {
          sendJSONresponse(res, 404, {
            "message": "eventId not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(aEvent);
        sendJSONresponse(res, 200, aEvent);
      });
  } else {
    console.log('No eventId specified');
    sendJSONresponse(res, 404, {
      "message": "No eventId in request"
    });
  }
};

/* POST a new event */
/* /api/events */
module.exports.eventsCreate = function(req, res) {

  var reqLatitude = 0;
  var reqLongitude = 0;

  var address = req.body.address;

  var geocoder = require('geocoder');

  geocoder.geocode(address,function(err,data)
  {
    reqLatitude = data.results[0].geometry.location.lat;
    reqLongitude = data.results[0].geometry.location.lng;

    thisEventInstance.create({
      name: req.body.name,
      address: req.body.address,
      longitude:reqLatitude,
      latitude:reqLongitude,
      category: req.body.category,
      dateCreated: new Date(),
    }, function(err, aEvent) {
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        sendJSONresponse(res, 201, aEvent);
      }
    }).error(function(err)
    {
    });
  });
};

/* PUT /api/events/:eventID */
module.exports.eventsUpdateOne = function(req, res) {
  if (!req.params.eventId) {
    sendJSONresponse(res, 404, {
      "message": "Not found, eventId is required"
    });
    return;
  }
  thisEventInstance
    .findById(req.params.eventId)
    .exec(
      function(err, aEvent) {
        if (!aEvent) {
          sendJSONresponse(res, 404, {
            "message": "eventId not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }

        if(req.body.name)
            aEvent.name = req.body.name;

        if(req.body.address)
            aEvent.address = req.body.address;

        if(req.body.category)
            aEvent.category = req.body.category;

        console.log("bla");
        var date = new Date();
        console.log(date);

        aEvent.dateCreated = date;

        aEvent.save(function(err, aEvent) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, aEvent);
          }
        });
      }
  );
};

/* DELETE /api/events/:eventID */
module.exports.eventsDeleteOne = function(req, res) {
  var eventId = req.params.eventId;
  if (eventId) {
    thisEventInstance
      .findByIdAndRemove(eventId)
      .exec(
        function(err, aEvent) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Event id " + eventId + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No eventId"
    });
  }
};
