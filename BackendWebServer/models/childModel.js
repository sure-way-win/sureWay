const mongoose = require("mongoose");

const childrenSchema = new mongoose.Schema({
  name: { type: String },
  parent_username: { type: String },
  age: { type: Number },
  school: { type: String },
  pickupAddress: { type: String },
  vehicleID: { type: String },
  isVerified: { type: Boolean, default: false },
  travellingStatus: { type: Number, default: 0 },
  agency: { type: String },
});

const Children = mongoose.model("Children", childrenSchema, "Children");

module.exports = Children;
