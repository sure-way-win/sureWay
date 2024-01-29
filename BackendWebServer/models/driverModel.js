const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  hashedPassword: { type: String },
  NIC: { type: String },
  email: { type: String },
  contactNumber: { type: String },
  licenseNumber: { type: String },
  address: { type: String },
  agency: { type: String },
  assignedVehicle: { type: String, default: "" },
  Snap: { type: Array, default: [] },
});

const Driver = mongoose.model("Driver", driverSchema, "Drivers");

module.exports = Driver;
