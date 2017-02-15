var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema(
  {
      name: {type:String, required:true},
      address : {type:String, required:true},
      longitude: {type:Number, required:true},
      latitude: {type: Number, required:true},
      category : {type:mongoose.Schema.Types.String, ref:'Category'},
      dateCreated : Date,
  }
);

mongoose.model('Event', eventSchema);
