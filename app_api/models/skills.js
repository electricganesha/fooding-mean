var mongoose = require( 'mongoose' );

var skillSchema = new mongoose.Schema({
    name:String,
    description:String
});

mongoose.model('Skill', skillSchema);
