const express = require("express");
const router = express.Router();
const child = require("../models/childModel");

router.get("/gettingPickupAddress", async (req, res) => {
  try {
    const { vehicleID } = req.query;

    const gettingPickupAddress = await child
      .find({
        vehicleID,
      })
      .select("pickupAddress name");

    console.log(gettingPickupAddress);

    res.json({
      success: true,
      message: "Data retrieval successful",
      gettingPickupAddress: gettingPickupAddress,
    });
  } catch (error) {
    console.error("Error during getting pickup addresses:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
