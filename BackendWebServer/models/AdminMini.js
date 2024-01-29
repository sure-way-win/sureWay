const mongoose = require("mongoose");

const adminMiniSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  isVerified: { type: Boolean },
});

const AdminMini = mongoose.model("Admins", adminMiniSchema, "Admins");

module.exports = AdminMini;
