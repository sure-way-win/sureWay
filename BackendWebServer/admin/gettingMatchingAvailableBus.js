const express = require("express");
const router = express.Router();
const bus = require("../models/vehicleModel");

router.get("/gettingMatchingAvailableBus", async (req, res) => {
  try {
    const { School } = req.query;
    const { agency } = req.query; // Assuming the agency parameter is passed in the query string
    // console.log(req.query);

    if (!agency) {
      return res
        .status(400)
        .json({ success: false, message: "Agency parameter is required" });
    }

    const gettingMatchingBus = await bus
      .find({
        agency: agency,
        School: School,
      })
      .select("vehicleID seats seatsFilled Driver");

    const gettingMatchingAvailableBus = gettingMatchingBus.filter(
      (bus) => bus.seats !== bus.seatsFilled && bus.Driver !== ""
    );

    console.log(gettingMatchingAvailableBus);

    res.json({
      success: true,
      message: "Data retrieval successful",
      gettingMatchingAvailableBus: gettingMatchingAvailableBus,
    });
  } catch (error) {
    console.error("Error during getting matching vehicles:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
