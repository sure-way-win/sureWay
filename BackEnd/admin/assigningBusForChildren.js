const express = require("express");
const router = express.Router();
const child = require("../models/childModel");
const bus = require("../models/vehicleModel");

router.put("/assigningBusForChildren", async (req, res) => {
  const { vehicleID, parent_username, name } = req.body;
  const { agency } = req.query; // Assuming the agency parameter is passed in the query string

  if (!agency) {
    return res
      .status(400)
      .json({ success: false, message: "Agency parameter is required" });
  }

  try {
    const foundChild = await child.findOne({
      isVerified: false,
      Agency: agency,
      parent_username,
      name,
    });

    if (!foundChild) {
      return res
        .status(404)
        .json({ success: false, message: "Child not found" });
    }

    const foundBus = await bus.findOne({
      agency,
      vehicleID,
    });

    if (!foundBus) {
      return res.status(404).json({ success: false, message: "Bus not found" });
    }

    if (foundBus && foundChild) {
      // Update the found child document
      await child.findByIdAndUpdate(
        foundChild._id,
        {
          $set: {
            isVerified: true,
            vehicleID: vehicleID,
          },
        },
        { new: true }
      );
      const concatenatedName = `${name} ${parent_username}`;

      // Update the found bus document
      await bus.findByIdAndUpdate(
        foundBus._id,
        {
          $inc: { seatsFilled: 1 },
          $push: { Children: concatenatedName },
        },
        { new: true }
      );
    }

    // Send a response to the client
    res.json({
      success: true,
      message: "Bus assignment for children successful",
    });
  } catch (error) {
    console.error("Error during assigning bus to the children:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
