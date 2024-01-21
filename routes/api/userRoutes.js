const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminMini = require("../../models/AdminMini");

module.exports = (app) => {
  app.post("/Admin/login", async (req, res, next) => {
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
                  res.json({
                    token,
                    Admin: foundUser,
                  });
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

  // This is a protected route
  app.get("/Admin/data", checkToken, (req, res) => {
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
};

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
