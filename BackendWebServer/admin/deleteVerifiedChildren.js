const express = require("express");
const router = express.Router();
const child = require("../models/childModel");
const bus = require("../models/vehicleModel");

router.put("/deleteVerifiedChildren", async (req, res) => {
  const { parent_username, name } = req.body;

  try {
    const foundChild = await child.findOne({
      parent_username,
      name,
    });

    if (!foundChild) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    const foundBus = await bus.findOne({ vehicleID: foundChild.vehicleID });
    console.log(foundBus);

    if (!foundBus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }
    const concatenatedName = `${name} ${parent_username}`;
    await child.deleteOne({ _id: foundChild._id });
    console.log(concatenatedName);
    await bus.findByIdAndUpdate(
      foundBus._id,
      {
        $inc: { seatsFilled: -1 },
        $pull: { Children: concatenatedName },
      },
      { new: true }
    );

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
