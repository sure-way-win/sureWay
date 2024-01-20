const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const vehicleSchema = new mongoose.Schema({
  vehicleID: { type: String, required: true },
  School: { type: String, required: true },
  seats: { type: Number },
  seatsFilled: { type: Number, default: 0 },
  Driver: { type: String, default: "" },
  children: { type: Array, default: [] },
  ThingName: { type: String },
  agency: { type: String },
});
const bus = mongoose.model("Bus", vehicleSchema, "Vehicles");

router.post("/vehicleRegistration", async (req, res) => {
  const { vehicleNumber, School, seats } = req.body;
  // const { agency } = "req.query"; // Assuming the agency parameter is passed in the query string

  // if (!agency) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "Agency parameter is required" });
  // }
  const agency = "Rosa-Express";
  const ThingName = "SN0034";

  try {
    const newVehicle = new bus({
      vehicleID: vehicleNumber,
      School,
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
