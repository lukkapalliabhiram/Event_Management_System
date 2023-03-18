const router = require('express').Router();
let Venue = require('../models/venue'); // change to 'venue.model' instead of 'venue'

// Get all venues
router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (err) {
    console.error('Error retrieving venues:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
