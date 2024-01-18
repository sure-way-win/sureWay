const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, required: true },
});

const Admin = mongoose.model("Admin", adminSchema, "Admins");

module.exports = Admin;
