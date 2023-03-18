const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  venueName: String,
  venueOwnerEmail: String,
  location: String,
  sportName: String,
  description: String,
  image: String,
  availableTimeSlots: [String],
  rating: Number,
  architecturalMapImage: String,
  facilities: [String]
});

const Venue = mongoose.model('Venue', venueSchema, 'Venues');

module.exports = Venue;
