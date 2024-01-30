const express = require("express");
const router = express.Router();
const driver = require("../models/driverModel");
const bus = require("../models/vehicleModel");

router.put("/deleteDriver", async (req, res) => {
  const { username } = req.body;

  try {
    const foundDriver = await driver.findOne({
      username,
    });
    const foundBus = await bus.findOne({
      vehicleID: foundDriver.assignedVehicle,
    });

    if (!foundBus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    if (!foundDriver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }
    await bus.findByIdAndUpdate(
      foundBus._id,
      {
        $set: { Driver: "" }, // Set the Driver property to an empty string
      },
      { new: true } // To get the updated document after the update
    );

    await driver.deleteOne({ _id: foundDriver._id });

    // Send a response to the client with a status code of 204 (No Content) for successful deletion
    res.status(204).end();
  } catch (error) {
    console.error("Error during rejecting child request:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message, // Include more details about the error if needed
    });
  }
});

module.exports = router;
