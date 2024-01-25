const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String },
  username: { type: String },
  hashedPassword: { type: String },
  isVerified: { type: Boolean, default: false },
  email: { type: String },
  contactNumber: { type: Number },
});

const User = mongoose.model("User", userSchema, "Users");

module.exports = User;
