const express = require("express");
const router = express.Router();
const driver = require("../models/driverModel");

router.get("/gettingDrivers", async (req, res) => {
  try {
    const { agency } = req.query; // Assuming the agency parameter is passed in the query string
    console.log(agency);

    if (!agency) {
      return res
        .status(400)
        .json({ success: false, message: "Agency parameter is required" });
    }
    const gettingDrivers = await driver.find({
      agency: agency,
    });

    // Print the data to the console
    console.log("Getting Drivers:", gettingDrivers);

    res.json({
      success: true,
      message: "Data retrieval successful",
      gettingDrivers: gettingDrivers,
    });
  } catch (error) {
    console.error("Error during getting registered drivers:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;
