const express = require("express");
const router = express.Router();
const bus = require("../models/vehicleModel");

router.get("/registeredVehicles", async (req, res) => {
  try {
    const { agency } = req.query; // Assuming the agency parameter is passed in the query string

    if (!agency) {
      return res
        .status(400)
        .json({ success: false, message: "Agency parameter is required" });
    }
    const registeredVehicles = await bus.find({ agency: agency });

    // Print the data to the console
    console.log("Registered Vehicles:", registeredVehicles);

    res.json({
      success: true,
      message: "Data retrieval successful",
      registeredVehicles: registeredVehicles,
    });
  } catch (error) {
    console.error("Error during getting registered vehicles:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
