var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var reputationSchema = new mongoose.Schema({
    
});


var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String,
  provider: String,
  profilePic: String,
  profileBio: String,
  upVotes: { type: Number, default: 0 },
  downVotes: { type: Number, default: 0 },
  stars : { type: Number, min: 0, max: 5, default: 0},
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }],
  friends:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  photos:[String],
  country: String
  
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);
