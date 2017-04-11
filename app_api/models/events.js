var mongoose = require( 'mongoose' );

var menuSchema = new mongoose.Schema({
    entree: String,
    first: String,
    second: String,
    dessert: String
});

var reviewSchema = new mongoose.Schema({
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    stars: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true}
});

var postSchema = new mongoose.Schema({
    poster: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateOfPost: { type: Date, default: Date.now },
    message: {
        type: String,
        required: true,
    }
});

var eventsSchema = new mongoose.Schema({
    dateCreated: { type: Date, default: Date.now },
    startDate:  { type: Date, required: true },
    endDate:  { type: Date, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    title: String,
    description: String,
    address: String,
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' }],
    menu: [menuSchema],
    coverPhoto: String,
    attendeeLimit : Number,
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    photos: [String],
    wall: [postSchema],
    reviews: [reviewSchema],
    stars : { type: Number, min: 1, max: 5 }
});

mongoose.model('Events', eventsSchema);