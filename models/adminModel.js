const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  password: { type: String },
  isVerified: { type: Boolean, default: false },
  email: { type: String },
  contactNumber: { type: Number },
  Vehicles: { type: Object },
});

const Admin = mongoose.model("Admin", adminSchema, "Admins");

module.exports = Admin;
