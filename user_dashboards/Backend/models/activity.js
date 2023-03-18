const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    activityName: String,
    activityLocation: String,
    ageRange: String,
    cost: String,
    description: String,
    image: String,
    maxCapacity: Number,
    rating: Number
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
