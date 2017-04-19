var mongoose = require( 'mongoose' );

var categorySchema = new mongoose.Schema({
    subcategory: { type: String, required: true },
    title: { type: String, required: true },
    icon: String
});

mongoose.model('Categories', categorySchema);