const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleID: { type: String },
  School: { type: String },
  seats: { type: Number },
  seatsFilled: { type: Number, default: 0 },
  Driver: { type: String, default: "" },
  Children: { type: Array },
  agency: { type: String },
  ThingName: { type: String },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema, "Vehicles");

module.exports = Vehicle;
