const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3001;
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // Enable parsing of JSON in requests

const connectToDatabase = require("./mongoDB/connection");
connectToDatabase();

const verifyAdmin = require("./verifyingAdmin/verifyingAdmin");

app.post("/verifyingAdmin", async (req, res, next) => {
  const { body } = req;
  const { username, password, verificationCode } = body;

  const verificationResult = await verifyAdmin(
    username,
    password,
    verificationCode
  );

  if (verificationResult.success) {
    res.send(verificationResult.success);
  } else {
    res.status(400).send(verificationResult.error);
  }
});

const adminAuthRoutes = require("./adminLogin");
app.post("/Admin/login", adminAuthRoutes.adminLogin);
app.get("/Admin/data", adminAuthRoutes.checkToken, adminAuthRoutes.adminData);

const getRegisteredUsers = require("./admin/gettingRegisteredUsers");
app.use("/Admin", getRegisteredUsers);

const getDrivers = require("./admin/gettingDrivers");
app.use("/Admin", getDrivers);

const addingDrivers = require("./admin/driverRegistration");
app.use("/Admin", addingDrivers);

const addingVehicles = require("./admin/vehicleRegistration");
app.use("/Admin", addingVehicles);

const gettingVehicles = require("./admin/gettingRegisteredVehicles");
app.use("/Admin", gettingVehicles);

const gettingbusNotAssignedChildren = require("./admin/gettingbusNotAssignedChildren");
app.use("/Admin", gettingbusNotAssignedChildren);

// Create a User model based on the schema
const User = require("./models/userModel");

// Create a driver model based on the schema
const driver = require("./models/driverModel");

// Create a bus model based on the schema
const bus = require("./models/vehicleModel");

//------------------------------------methods for users retrieving (read)-----------------------

app.get("/forRegistration", async (req, res) => {
  try {
    const usersNeedToRegister = await User.find({ ChildAddRequest: 0 }).select(
      "-hashedPassword"
    );

    // Print the data to the console
    console.log("User needs to register:", usersNeedToRegister);

    res.json({
      success: true,
      message: "Data retrieval successful",
      users: usersNeedToRegister,
    });
  } catch (error) {
    console.error(
      "Error during getting users who need to register:",
      error.message
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//------------------------------------methods for users registering (update)-----------------------

app.put("/registering", async (req, res) => {
  const { name } = req.body;
  // console.log("Received request body:", req.body);

  try {
    const existingUser = await User.findOne({ username: name });
    console.log("Existing User:", existingUser);

    if (existingUser) {
      await User.updateOne(
        { username: name },
        { $set: { ChildAddRequest: 1 } }
      );
      res.json({
        success: true,
        message: "User already exists, updated 'ChildAddRequest' field to 1",
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//------------------------------------methods for vehicle showing which are not having drivers (read)-----------------------

app.get("/notAssignedDriversVehicles", async (req, res) => {
  try {
    // Retrieve all registered-vehicles from the 'Sureway' collection
    const notAssignedDriversVehicles = await bus.find({ Driver: null });

    // Print the data to the console
    console.log("notAssignedDriversVehicles:", notAssignedDriversVehicles);

    res.json({
      success: true,
      message: "Data retrieval successful",
      notAssignedDriversVehicles: notAssignedDriversVehicles,
    });
  } catch (error) {
    console.error("Error during getting no driver vehicles:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//------------------------------------methods for vehicle showing which are having drivers with available seats (read)-----------------------

app.get("/availableWithDrivers", async (req, res) => {
  try {
    const availabeWithDrivers = await bus.find({
      Driver: { $ne: null },
      seatsfilled: { $ne: "$seats" }, // Assuming seatsfilled and seats are numeric fields
    });

    // Print the data to the console
    console.log("availabeWithDrivers:", availabeWithDrivers);

    res.json({
      success: true,
      message: "Data retrieval successful",
      availabeWithDrivers: availabeWithDrivers,
    });
  } catch (error) {
    console.error(
      "Error during vehicles which have drive with available seats:",
      error.message
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//------------------------------------methods for assigning bus for children who are not assigned to bus (update)-----------------------

app.put("/assigningVehicle", async (req, res) => {
  const { username, name, vehicleID } = req.body;
  console.log("Received request body:", req.body);
  try {
    const existingChild = await User.findOne({
      children: {
        $elemMatch: {
          name: name,
        },
      },
      username: username,
    });

    console.log("Existing Child:", existingChild);

    if (existingChild) {
      await User.updateOne(
        {
          "children.name": name,
          username: username,
        },
        {
          $set: {
            "children.$.vehicleID": vehicleID,
          },
        }
      );
      await bus.updateOne({ vehicleID }, { $push: { children: name } });

      res.json({
        success: true,
        message: "Child already exists, updated assigned vehicle",
      });
    } else {
      res.status(404).json({ success: false, message: "Child not found" });
    }
  } catch (error) {
    console.error("Error during assigning bus for children:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//------------------------------------methods for getting location coordinates (read)-----------------------

app.get("/dummyCoordinates", (req, res) => {
  // Assuming dummy coordinates for a location
  const latitude = 37.7749;
  const longitude = -122.4194;

  // Send the coordinates as JSON to the frontend
  res.json({ latitude, longitude });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
