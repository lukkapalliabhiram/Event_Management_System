const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());


// Connect to MongoDB using Mongoose
mongoose.connect("mongodb+srv://hanabihyuga:hanabihyuga@hanabihyuga.stcwckw.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connection established successfully');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Define a schema for your venues collection using Mongoose
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


const activitySchema = new mongoose.Schema(
  {
    activityName: String,
    activityLocation: String,
    ageRange: String,
    cost: String,
    description: String,
    image: String,
    availableTimeSlots: [String],
    maxCapacity: Number,
    rating: Number,
    facilities: [String]
  });

const playerSchema = new mongoose.Schema(
  {
    playerName: String,
    playerGender: String,
    playerAgeRange: String,
    playerSkillLevel: String,
    playerAvailability: String,
    playerSportActivity: String,
    description: String,
    emailId: String,
    phoneNumber: String,
    image: String,
    address: String,
    availableTimeSlots: [String],
  });



// Define a Mongoose model for your venues collection
const Venue = mongoose.model('Venue', venueSchema, 'Venues');

// Define a Mongoose model for your venues collection
const activity = mongoose.model('activity', activitySchema, 'activities');

// Define a Mongoose model for your venues collection
const player = mongoose.model('player', playerSchema, 'players');

// Define a route for retrieving all venues from your MongoDB database
app.get('/venues', async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (err) {
    console.error('Error retrieving venues:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a route for retrieving all activities from your MongoDB database
app.get('/activities', async (req, res) => {
  try {
    const activitie = await activity.find();
    res.json(activitie);
  } catch (err) {
    console.error('Error retrieving activities:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a route for retrieving all activities from your MongoDB database
app.get('/players', async (req, res) => {
  try {
    const playe = await player.find();
    //console.log(playe);
    res.json(playe);
  } catch (err) {
    console.error('Error retrieving players:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
