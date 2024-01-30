const express = require("express");
const router = express.Router();
const driver = require("../models/driverModel");
const bus = require("../models/vehicleModel");
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
  const existingUserName = await driver.findOne({ username: userDname });
  if (existingUserName) {
    console.log("Username already exists");
    return res.status(400).send("Username already exists");
  }
  const existingDriver = await driver.findOne({
    $or: [{ NIC: nicD }, { licenseNumber: licensenumberD }],
  });
  if (existingDriver) {
    console.log("NIC or license Number already exists");
    return res.status(400).send("NIC or license Number already exists");
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

    const foundVehicle = await bus.findOne({
      vehicleID: assignedVehicle,
    });

    if (foundVehicle) {
      // Update the found child document
      await bus.findByIdAndUpdate(
        foundVehicle._id,
        {
          $set: {
            Driver: userDname,
          },
        },
        { new: true }
      );
    }

    // Send a response to the client
    res.json({ success: true, message: "Driver adding successful" });
  } catch (error) {
    console.error("Error during adding driver:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;
