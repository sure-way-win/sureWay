const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleID: { type: String },
  School: { type: String },
  seats: { type: Number },
  seatsFilled: { type: Number },
  Driver: { type: String },
  Children: { type: Array },
  address: { type: String },
  agency: { type: String },
  ThingName: { type: String },
});

const Vehilce = mongoose.model("Vehicle", vehicleSchema, "Vehicles");

module.exports = Vehicle;
