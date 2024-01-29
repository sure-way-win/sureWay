const express = require("express");
const router = express.Router();
const driver = require("../models/driverModel");

router.get("/gettingDriverSnaps", async (req, res) => {
  try {
    const { username } = req.query;
    console.log("Username is:", username);
    const driverSnaps = await driver.find({ username }).select("Snap");

    // Print the data to the console
    console.log("Driver snap urls are:", driverSnaps);

    res.json({
      success: true,
      message: "Data retrieval successful",
      driverSnaps: driverSnaps,
    });
  } catch (error) {
    console.error("Error during getting  driver snaps:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
