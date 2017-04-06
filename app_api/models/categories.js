var mongoose = require( 'mongoose' );

var categorySchema = new mongoose.Schema({
    title: { type: Date, default: Date.now },
    dateOfEvent:  String,
    icon: String
});

mongoose.model('Categories', categorySchema);