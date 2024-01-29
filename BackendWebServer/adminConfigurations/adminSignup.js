const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");

router.post("/signup", async (req, res) => {
  const { body } = req;
  const { name, username, password, email, contactNumber, address } = body;
  try {
    // Check if the username already exists
    const existingUser = await Admin.findOne({ $or: [{ username }, { name }] });
    if (existingUser) {
      console.log("Username or agency already exists");
      return res.status(400).send("Username or agency already exists");
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new AdminMini instance with the provided username and hashed password
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      email,
      name,
      contactNumber,
      address,
    });

    // Save the new admin to the database
    const savedAdmin = await newAdmin.save();

    // Optionally, you may generate a JWT token for the registered admin
    jwt.sign(
      { user: savedAdmin },
      "privatekey",
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send(token);
        }
      }
    );
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
