const mongoose = require("mongoose");

const childrenSchema = new mongoose.Schema({
  name: { type: String },
  parentName: { type: String },
  age: { type: Number },
  school: { type: String },
  pickupAddress: { type: String },
  vehicleId: { type: String },
  isVerified: { type: Number, default: 0 },
  travellingStatus: { type: Number, default: 0 },
  agency: { type: String },
});

const Children = mongoose.model("Children", childrenSchema, "Children");

module.exports = Children;
