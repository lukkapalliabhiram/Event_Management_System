const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    playerGender: String,
    playerAgeRange: String,
    playerSkillLevel: String,
    playerAvailability: String,
    playerSportActivity: String,
    description: String,
    emailId: String,
    image: String
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
