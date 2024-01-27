const express = require("express");
const router = express.Router();
const child = require("../models/childModel");

router.get("/busNotAssignedChildren", async (req, res) => {
  try {
    const { agency } = req.query; // Assuming the agency parameter is passed in the query string

    if (!agency) {
      return res
        .status(400)
        .json({ success: false, message: "Agency parameter is required" });
    }

    const childDetails = await child.find({
      isVerified: 0,
      Agency: agency,
    });

    // Print the data to the console
    // console.log("Child Details:", childDetails);

    res.json({
      success: true,
      message: "Data retrieval successful",
      childDetails: childDetails,
    });
  } catch (error) {
    console.error("Error during getting children:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;
