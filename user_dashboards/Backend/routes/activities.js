const router = require('express').Router();
const Venue = require('../models/activity');

router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
