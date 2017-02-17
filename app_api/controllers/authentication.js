var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content)
{
  res.status(status);
  res.json(content);
};

module.exports.register = function(req,res)
{
  if(!req.body.name || !req.body.email || !req.body.password)
  {
    sendJSONresponse(res,400 , {
      "message": 'Name, email and password required'
    });
    return;
  }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.provider = "_fooding"

  user.save(function(err)
  {
    var token;
    if(err)
    {
      sendJSONresponse(res,404, err);
    }
    else {
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token":token
      });
    }
  });
};

module.exports.login = function(req,res)
{

  if(req.body.provider)
  {
    if(req.body.provider == "_fooding")
    {
      if(!req.body.email || !req.body.password)
      {
        sendJSONresponse(res,400, {
          "message": "Email and password are required"
        });
        return;
      }

      passport.authenticate('local', function(err, user, info)
      {
        var token;

        if(err)
        {
          sendJSONresponse(res,404,err);
          return;
        }

        if(user)
        {
          token = user.generateJwt();
          sendJSONresponse(res,200, {
            "token":token
          });
        }
        else {
          sendJSONresponse(res,401,info);
        }
      }) (req,res);
    }
    else if(req.body.provider == "_google" || req.body.provider == "_facebook")
    {
      User.findOne({email: req.body.email}, function(err,user) {

        if (err)
        {
          sendJSONresponse(res,400, {
            "message": "Error "+err,
          });
          return;
        }

        if (!user) {

          if(!req.body.name)
          {
            sendJSONresponse(res,400, {
              "message": "Name is required"
            });
            return;
          }

            user = new User({
              name: req.body.name,
              email: req.body.email,
              password:null,
              provider:req.body.provider,
              profileBLOB:JSON.parse(req.body.profileBLOB)
            });

          user.save(function(err) {
            if (err) console.log(err);
            token = user.generateJwt();
            sendJSONresponse(res,200, {
              "token":token
            });
          });
        } else {
          //found user. Return token
          token = user.generateJwt();
          sendJSONresponse(res,200, {
            "token":token
          });
        }
      });
  }
}
else {
  sendJSONresponse(res,400, {
    "message": "A provider must be specified"
  });
  return;
}
};
