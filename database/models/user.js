const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  score: {
    type : Array,
    required : true,
  },
  currentLevel: {
    type : Number,
    required : true,
  },
  time : {
    type : Array,
    required : true,
  },
  totalTime: {
    type : Number,
    required : true,
  },
  totalScore: {
    type : Number,
    required : true,
  },
  isAdmin: {
    type : Boolean,
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
