var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema(
  {
      author: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
      name: {type:String, required:true},
      address : {type:String, required:true},
      longitude: {type:Number, required:true},
      latitude: {type: Number, required:true},
      category : {type:mongoose.Schema.Types.String, ref:'Category'},
      dateCreated : Date,
  }
);

mongoose.model('Event', eventSchema);
