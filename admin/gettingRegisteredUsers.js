const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/registeredUsers", async (req, res) => {
  try {
    // Retrieve all registered-users from the 'Sureway' collection
    const registeredUsers = await User.find({ ChildAddRequest: 1 }).select(
      "-hashedPassword"
    );

    // Print the data to the console
    console.log("Registered users:", registeredUsers);

    res.json({
      success: true,
      message: "Data retrieval successful",
      users: registeredUsers,
    });
  } catch (error) {
    console.error("Error during getting registered users:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
