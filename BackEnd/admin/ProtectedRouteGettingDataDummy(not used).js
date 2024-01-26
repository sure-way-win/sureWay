const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const AdminMini = require("../models/AdminMini");

router.get("/Admin/data", checkToken, (req, res) => {
  // verify the JWT token generated for the user
  jwt.verify(req.token, "privatekey", (err, authorizedData) => {
    if (err) {
      // If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      // If token is successfully verified, we can send the authorized data
      res.json({
        message: "Successful log in",
        authorizedData,
      });
      console.log("SUCCESS: Connected to protected route");
    }
  });
});

// Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    req.token = token;

    next();
  } else {
    // If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};
module.exports = router;
