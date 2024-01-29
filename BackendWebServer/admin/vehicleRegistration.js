const express = require("express");
const router = express.Router();
const bus = require("../models/vehicleModel");

router.post("/vehicleRegistration", async (req, res) => {
  const { vehicleNumber, School, SchoolAddress, seats, ThingName } = req.body;
  const { agency } = req.query; // Assuming the agency parameter is passed in the query string

  if (!agency) {
    return res
      .status(400)
      .json({ success: false, message: "Agency parameter is required" });
  }
  const existingVehicle = await bus.findOne({ vehicleID: vehicleNumber });
  if (existingVehicle) {
    console.log("Vehicle already registered");
    return res.status(400).send("Vehicle already registered");
  }
  const existingThing = await bus.findOne({ ThingName });
  if (existingThing) {
    console.log("Under this serial number already vehicle registered");
    return res
      .status(400)
      .send("Under this serial number already vehicle registered");
  }
  try {
    const newVehicle = new bus({
      vehicleID: vehicleNumber,
      School,
      SchoolAddress,
      seats,
      agency,
      ThingName,
    });

    // Save the User document to the database
    await newVehicle.save();

    // You can print the data to the console, including the hashed password
    console.log("Received driver data:", {
      vehicleNumber,
      School,
      SchoolAddress,
      seats,
      agency,
      ThingName,
    });

    // Send a response to the client
    res.json({ success: true, message: "Vehicle adding successful" });
  } catch (error) {
    console.error("Error during adding vehicle :", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;
