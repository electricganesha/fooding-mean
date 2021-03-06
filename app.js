require('dotenv').load();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var uglifyJs = require("uglify-js");
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');

require('./app_api/models/db');
require('./app_api/config/passport');

var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var files = [
  'app_client/fooding.js',
  'app_client/common/directives/navigation/navigation.directive.js',
  'app_client/common/directives/navigation/navigation.controller.js',
  'app_client/common/services/authentication.service.js',
  'app_client/common/services/categories.data.service.js',
  'app_client/common/services/data.service.js',
  'app_client/home/home.controller.js',
  'app_client/events/events.controller.js',
  'app_client/newevent/newevent.controller.js',
  'app_client/eventpopup/eventpopup.controller.js',
  'app_client/myevents/myevents.controller.js',
  'app_client/profile/profile.controller.js',
  'app_client/user/user.controller.js',
  'app_client/auth/signin/signin.controller.js',
  'app_client/auth/register/register.controller.js'
];

var uglified = uglifyJs.minify(files, { compress : false });

fs.writeFile('public/angular/fooding.min.js', uglified.code, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("Script generated and saved:", 'fooding.min.js');
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));

app.use(passport.initialize());

//app.use('/', routes);
app.use('/api', routesApi);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
