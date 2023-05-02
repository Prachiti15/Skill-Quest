const mongoose = require("mongoose");
const LeaderboardSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  score: {
    type: Number,
    required: true,
    unique: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Leaderboard = mongoose.model("Leaderboard", LeaderboardSchema);
module.exports = Leaderboard;
