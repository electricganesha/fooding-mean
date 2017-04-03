var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
    .findById(req.payload._id)
    .exec(function(err, user) {
      res.status(200).json(user);
    });
  }

};

module.exports.profileUpdate = function(req,res)
{

  var email = req.body.profileDataUpdate.email;

  User.findOne({ 'email': email }, function(err,user){
    if(err){ return next(err); }

    user.email = req.body.profileDataUpdate.email;
    user.name = req.body.profileDataUpdate.fullname;
    user.nickname = req.body.profileDataUpdate.nickname;
    user.address = req.body.profileDataUpdate.address;
    user.nif = req.body.profileDataUpdate.nif;
    user.telephone = req.body.profileDataUpdate.telephone;

    setTimeout(function(){
      user.save(function(err,newuser){
        if(err){ console.log(err); }
        console.log(newuser);
        res.json(newuser);
      });
    }, 3000);



  });

}
