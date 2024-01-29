const express = require("express");
const router = express.Router();
const bus = require("../models/vehicleModel");

router.get("/gettingThingName", async (req, res) => {
  try {
    const { vehicleID } = req.query;

    const ThingName = await bus.find({ vehicleID }).select("ThingName");
    // console.log(ThingName);
    res.json({
      success: true,
      message: "Data retrieval successful",
      ThingName: ThingName,
    });
  } catch (error) {
    console.error("Error during getting thing name:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;
