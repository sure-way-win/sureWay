const mongoose = require("mongoose");

const childMiniSchema = new mongoose.Schema({
  name: { type: String },
  isVerified: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema({
  fullname: { type: String },
  username: { type: String },
  hashedPassword: { type: String },
  isVerified: { type: Boolean, default: false },
  email: { type: String },
  contactNumber: { type: Number },
  children: { childMiniSchema },
  ChildAddRequest: { type: Number, default: -1 },
});

const User = mongoose.model("User", userSchema, "Users");

module.exports = User;
