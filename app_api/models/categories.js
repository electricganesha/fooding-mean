var mongoose = require( 'mongoose' );

var categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    icon: String
});

mongoose.model('Categories', categorySchema);