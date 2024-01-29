const express = require("express");
const router = express.Router();
const bus = require("../models/vehicleModel");

router.get("/registeredVehiclesWithoutDriver", async (req, res) => {
  try {
    const { agency } = req.query; // Assuming the agency parameter is passed in the query string

    if (!agency) {
      return res
        .status(400)
        .json({ success: false, message: "Agency parameter is required" });
    }
    const registeredVehicles = await bus.find({ agency: agency });

    const registeredVehiclesWithoutDriver = registeredVehicles.filter(
      (bus) => bus.Driver === ""
    );

    // Print the data to the console
    console.log(
      "Registered Vehicles without driver:",
      registeredVehiclesWithoutDriver
    );

    res.json({
      success: true,
      message: "Data retrieval successful",
      registeredVehiclesWithoutDriver: registeredVehiclesWithoutDriver,
    });
  } catch (error) {
    console.error(
      "Error during getting registered vehicles with driver:",
      error.message
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
