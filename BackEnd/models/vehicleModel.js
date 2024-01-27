const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleID: { type: String },
  School: { type: String },
  SchoolAddress: { type: String },
  seats: { type: Number },
  seatsFilled: { type: Number, default: 0 },
  Driver: { type: String, default: "" },
  Children: { type: Array },
  agency: { type: String },
  ThingName: { type: String },
  Snap: { type: String, default: "" },
  heading: { type: Number, default: 0 },
  returning: { type: Number, default: 0 },
  travellingStatus: { type: Number, default: 0 },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema, "Vehicles");

module.exports = Vehicle;
