const express = require("express");
const router = express.Router();
const driver = require("../models/driverModel");
const bcrypt = require("bcrypt");

router.post("/driverRegistration", async (req, res) => {
  const {
    firstName,
    lastDName,
    userDname,
    password,
    contactDNumber,
    emailD,
    addressD,
    nicD,
    licensenumberD,
    assignedVehicle,
  } = req.body;

  const { agency } = req.query; // Assuming the agency parameter is passed in the query string

  if (!agency) {
    return res
      .status(400)
      .json({ success: false, message: "Agency parameter is required" });
  }

  try {
    const hashedDPassword = await bcrypt.hash(password, 10);
    // created a new driver Document..
    const newDriver = new driver({
      firstName,
      lastName: lastDName,
      username: userDname,
      hashedPassword: hashedDPassword,
      contactNumber: contactDNumber,
      email: emailD,
      address: addressD,
      NIC: nicD,
      licenseNumber: licensenumberD,
      agency: agency,
      assignedVehicle: assignedVehicle,
    });

    // Save the User document to the database
    await newDriver.save();

    // Send a response to the client
    res.json({ success: true, message: "Driver adding successful" });
  } catch (error) {
    console.error("Error during adding driver:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;
