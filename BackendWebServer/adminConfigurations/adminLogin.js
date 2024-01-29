const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const AdminMini = require("../models/AdminMini");

router.post("/login", async (req, res) => {
  const { body } = req;
  const { username, password } = body;
  try {
    // Find a user with the provided username
    const foundUser = await AdminMini.findOne({ username });
    if (foundUser) {
      if (foundUser.isVerified) {
        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(
          password,
          foundUser.password
        );

        if (isPasswordMatch) {
          // If password matches, generate a JWT token for the user with a secret key
          jwt.sign(
            { user: foundUser },
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
        } else {
          console.log("ERROR: Incorrect password");
          res.status(401).send("Incorrect password");
        }
      } else {
        console.log("Account is not verified");
        res.status(403).send("Account is not verified");
      }
    } else {
      console.log("ERROR: User not found");
      res.status(401).send("User not found");
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
