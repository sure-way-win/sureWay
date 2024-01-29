const express = require("express");
const router = express.Router();
const child = require("../models/childModel");

router.put("/rejectRequest", async (req, res) => {
  const { parent_username, name } = req.body;
  const { agency } = req.query; // Assuming the agency parameter is passed in the query string

  if (!agency) {
    return res.status(400).json({
      success: false,
      message: "Agency parameter is required",
    });
  }

  try {
    const foundChild = await child.findOne({
      isVerified: false,
      Agency: agency,
      parent_username,
      name,
    });

    if (!foundChild) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    await child.deleteOne({ _id: foundChild._id });

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
