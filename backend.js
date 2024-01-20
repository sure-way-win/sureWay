const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;
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

require("./routes")(app);

const getRegisteredUsers = require("./admin/gettingRegisteredUsers");
app.use("/Admin", getRegisteredUsers);

const getDrivers = require("./admin/gettingDrivers");
app.use("/Admin", getDrivers);

const addingDrivers = require("./admin/driverRegistration");
app.use("/Admin", addingDrivers);

// Define a schema for the vehicle collection
const vehicleSchema = new mongoose.Schema({
  vehicleID: { type: String, required: true },
  School: { type: String, required: true },
  seats: { type: Number, default: 0 },
  seatsFilled: { type: Number, default: 0 },
  Driver: { type: String, default: null },
  children: { type: Array, default: null },
});

// Create a User model based on the schema
const User = require("./models/userModel");

// Create a driver model based on the schema
const driver = require("./models/driverModel");

// Create a bus model based on the schema
const bus = mongoose.model("Bus", vehicleSchema, "Vehicles");

//------------------------------------methods for users retrieving (read)-----------------------

app.get("/forRegistration", async (req, res) => {
  try {
    // Retrieve users who are need to register from the 'Sureway' collection
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

//------------------------------------methods for driver adding (create)-----------------------

app.post("/driverRegistration", async (req, res) => {
  const {
    firstName,
    lastDName,
    // userDname,
    // password,
    // contactDNumber,
    // emailD,
    // addressD,
    // nicD,
    // licensenumberD,
    // assignedVehicleIdD,
  } = req.body;
  // console.log("Received request body:", req.body);

  try {
    // const hashedDPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed password:", hashedDPassword);

    // created a new driver Document..
    const newDriver = new driver({
      firstName,
      lastDName,
      // userDname,
      // hashedDPassword,
      // contactDNumber,
      // emailD,
      // addressD,
      // nicD,
      // licensenumberD,
      // assignedVehicleIdD,
    });

    // Save the User document to the database
    await newDriver.save();

    // You can print the data to the console, including the hashed password
    console.log("Received driver data:", {
      firstName,
      lastDName,
      // userDname,
      // hashedDPassword,
      // contactDNumber,
      // emailD,
      // addressD,
      // nicD,
      // licensenumberD,
      // assignedVehicleIdD,
    });

    // Send a response to the client
    res.json({ success: true, message: "Driver adding successful" });
  } catch (error) {
    console.error("Error during adding driver:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//------------------------------------methods for vehicle adding (create)-----------------------

app.post("/vehicleRegistration", async (req, res) => {
  const { vehicleID, School, seats, seatsFilled, driver } = req.body;
  console.log("Received request body:", req.body);

  try {
    const newVehicle = new bus({
      vehicleID,
      School,
      seats,
      seatsFilled,
      driver,
    });

    // Save the User document to the database
    await newVehicle.save();

    // You can print the data to the console, including the hashed password
    console.log("Received driver data:", {
      vehicleID,
      School,
      seats,
      seatsFilled,
      driver,
    });

    // Send a response to the client
    res.json({ success: true, message: "Vehicle adding successful" });
  } catch (error) {
    console.error("Error during adding vehicle :", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//------------------------------------methods for vehicle showing (read)-----------------------

app.get("/registeredVehicles", async (req, res) => {
  try {
    // Retrieve all registered-vehicles from the 'Sureway' collection
    const registeredVehicles = await bus.find();

    // Print the data to the console
    console.log("Registered Vehicles:", registeredVehicles);

    res.json({
      success: true,
      message: "Data retrieval successful",
      registeredVehicles: registeredVehicles,
    });
  } catch (error) {
    console.error("Error during getting registered vehicles:", error.message);
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

//------------------------------------methods for drivers showing (read)-----------------------

//------------------------------------methods for showing children who are not assigned to bus (read)-----------------------

app.get("/childrenDetails", async (req, res) => {
  try {
    const childDetails = await User.find({
      children: {
        $elemMatch: {
          vehicleID: null,
        },
      },
      ChildAddRequest: 1,
    }).select("children");

    // Print the data to the console
    console.log("Child Details:", childDetails);

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
