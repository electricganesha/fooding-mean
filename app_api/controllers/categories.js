var mongoose = require('mongoose');
var Event = mongoose.model('Categories');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET categories by subcategory appetizers */
module.exports.appetizers = function(req, res) {
    Event.find({subcategory: "appetizers"})
    .exec(function(err, appetizers) {
        if (!appetizers) {
            sendJSONresponse(res, 404, {
                "message": "Appetizer category not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        sendJSONresponse(res, 200, appetizers);
    });
};

/* GET categories by subcategory dishes */
module.exports.dishes = function(req, res) {
    Event.find({subcategory: "dishes"})
    .exec(function(err, dishes) {
        if (!dishes) {
            sendJSONresponse(res, 404, {
                "message": "Dishes category not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        sendJSONresponse(res, 200, dishes);
    });
};

/* GET categories by subcategory desserts */
module.exports.desserts = function(req, res) {
    Event.find({subcategory: "desserts"})
    .exec(function(err, desserts) {
        if (!desserts) {
            sendJSONresponse(res, 404, {
                "message": "Dessert category not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        sendJSONresponse(res, 200, desserts);
    });
};

/* GET categories by subcategory drinks */
module.exports.drinks = function(req, res) {
    Event.find({subcategory: "drinks"})
    .exec(function(err, drinks) {
        if (!drinks) {
            sendJSONresponse(res, 404, {
                "message": "Drink category not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        sendJSONresponse(res, 200, drinks);
    });
};