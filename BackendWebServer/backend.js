const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // Enable parsing of JSON in requests

const connectToDatabase = require("./mongoDB/connection");
connectToDatabase();

const verifyAdmin = require("./adminConfigurations/verifyingAdmin");

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

const adminLogin = require("./adminConfigurations/adminLogin");
app.use("/Admin", adminLogin);

const assigningBusForChildren = require("./admin/assigningBusForChildren");
app.use("/Admin", assigningBusForChildren);

const gettingMatchingAvailableBus = require("./admin/gettingMatchingAvailableBus");
app.use("/Admin", gettingMatchingAvailableBus);

const rejectRequest = require("./admin/rejectRequest");
app.use("/Admin", rejectRequest);

const { triggeringSnap } = require("./admin/triggeringSnap");
app.use("/Admin", triggeringSnap);

const adminSignup = require("./adminConfigurations/adminSignup");
app.use("/Admin", adminSignup);

const getRegisteredUsers = require("./admin/gettingRegisteredUsers");
app.use("/Admin", getRegisteredUsers);

const getDrivers = require("./admin/gettingDrivers");
app.use("/Admin", getDrivers);

const gettingDriverSnaps = require("./admin/gettingDriverSnaps");
app.use("/Admin", gettingDriverSnaps);

const addingDrivers = require("./admin/driverRegistration");
app.use("/Admin", addingDrivers);

const addingVehicles = require("./admin/vehicleRegistration");
app.use("/Admin", addingVehicles);

const gettingVehicles = require("./admin/gettingRegisteredVehicles");
app.use("/Admin", gettingVehicles);

const registeredVehiclesWithoutDriver = require("./admin/registeredVehiclesWithoutDriver");
app.use("/Admin", registeredVehiclesWithoutDriver);

const gettingVehicleSnap = require("./admin/gettingVehicleSnap");
app.use("/Admin", gettingVehicleSnap);

const gettingbusNotAssignedChildren = require("./admin/gettingbusNotAssignedChildren");
app.use("/Admin", gettingbusNotAssignedChildren);

const gettingThingName = require("./admin/gettingThingName");
app.use("/Admin", gettingThingName);

const gettingPickupAddresses = require("./admin/gettingPickupAddresses");
app.use("/Admin", gettingPickupAddresses);

const deleteVerifiedChildren = require("./admin/deleteVerifiedChildren");
app.use("/Admin", deleteVerifiedChildren);

const deleteDriver = require("./admin/deleteDriver");
app.use("/Admin", deleteDriver);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
