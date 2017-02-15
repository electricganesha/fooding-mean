var mongoose = require('mongoose');
var thisCategory = mongoose.model('Category');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET list of categories */
module.exports.categoryList = function(req, res) {
    thisCategory.find({}, function(err, aCategory) {
       res.json(aCategory);
  });
};

/* GET an category by its id */
module.exports.categoryReadOne = function(req, res) {
  console.log('Finding category details', req.params);
  if (req.params && req.params.categoryId) {
    thisCategory
      .findById(req.params.categoryId)
      .exec(function(err, aCategory) {
        if (!event) {
          sendJSONresponse(res, 404, {
            "message": "categoryId not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(event);
        sendJSONresponse(res, 200, aCategory);
      });
  } else {
    console.log('No categoryId specified');
    sendJSONresponse(res, 404, {
      "message": "No categoryId in request"
    });
  }
};

/* POST a new category */
/* /api/categories */
module.exports.categoryCreate = function(req, res) {
  thisCategory.create({
    name: req.body.name,
  }, function(err, aCategory) {
    if (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
    } else {
        console.log(aCategory);
        sendJSONresponse(res, 201, aCategory);
    }
  });
};

/* PUT /api/categories/:categoryId */
module.exports.categoryUpdateOne = function(req, res) {
  if (!req.params.categoryId) {
    sendJSONresponse(res, 404, {
      "message": "Not found, eventId is required"
    });
    return;
  }
  thisCategory
    .findById(req.params.categoryId)
    .exec(
      function(err, aCategory) {
        if (!aCategory) {
          sendJSONresponse(res, 404, {
            "message": "eventId not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }

        if(req.body.name)
            aCategory.name = req.body.name;
        aCategory.save(function(err, aCategory) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, aCategory);
          }
        });
      }
  );
};

/* DELETE /api/categories/:categoryId */
module.exports.categoryDeleteOne = function(req, res) {
  var categoryId = req.params.categoryId;
  if (categoryId) {
    thisCategory
      .findByIdAndRemove(categoryId)
      .exec(
        function(err, aCategory) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Category id " + categoryId + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No categoryId"
    });
  }
};
