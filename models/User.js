const mongoose = require("mongoose");

// Define a schema for the children
const childSchema = new mongoose.Schema({
  name: String,
  age: Number,
  school: String,
  pickupAddress: String,
  dropAddress: String,
  vehicleID: String,
  travellingStatus: { type: Number },
});

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  ChildAddRequest: { type: Number, default: -1 },
  children: [childSchema], // An array of children objects
});
const User = mongoose.model("User", userSchema, "Users");

module.exports = User;
