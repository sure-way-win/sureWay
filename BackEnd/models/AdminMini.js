const mongoose = require("mongoose");

const adminMiniSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, required: true },
});

const AdminMini = mongoose.model("Admins", adminMiniSchema, "Admins");

module.exports = AdminMini;
