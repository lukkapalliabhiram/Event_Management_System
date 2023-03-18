const router = require('express').Router();
const Venue = require('../models/player');

router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
