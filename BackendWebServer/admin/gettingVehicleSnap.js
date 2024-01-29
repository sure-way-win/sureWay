const express = require("express");
const router = express.Router();
const bus = require("../models/vehicleModel");

router.get("/gettingVehicleSnap", async (req, res) => {
  try {
    const { vehicleID } = req.query;
    console.log(vehicleID);
    const vehicleSnap = await bus.find({ vehicleID }).select("Snap");
    // Print the data to the console
    console.log("vehicle snap url is:", vehicleSnap);

    res.json({
      success: true,
      message: "Data retrieval successful",
      vehicleSnap: vehicleSnap,
    });
  } catch (error) {
    console.error("Error during getting vehicle snap:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
