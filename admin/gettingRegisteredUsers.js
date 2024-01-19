const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Children = require("../models/childModel");

router.get("/registeredUsers", async (req, res) => {
  try {
    // const { agency } = "req.query"; // Assuming the agency parameter is passed in the query string

    // if (!agency) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Agency parameter is required" });
    // }
    const agency = "Rani-Express";
    const registeredUsers = await Children.find({
      isVerified: 1,
      Agency: agency,
    }).select("parentName name");

    console.log("Registered users:", registeredUsers);

    const parentNames = registeredUsers.map((user) => user.parentName);

    // Filter registeredUsers based on matching parentName
    const matchingUsers = await User.find({
      username: { $in: parentNames },
    }).select("-children -ChildAddRequest -hashedPassword -_id -isVerified");

    // console.log("matching users from User collection:", matchingUsers);

    // Create a map for easier lookup
    const registeredUsersMap = new Map();

    // Iterate over registeredUsers to populate the map
    registeredUsers.forEach((user) => {
      const existingData = registeredUsersMap.get(user.parentName) || [];
      existingData.push(user.name);
      registeredUsersMap.set(user.parentName, existingData);
    });

    // Merge the data
    const filteredUsers = matchingUsers.map((user) => {
      const registeredUserData = registeredUsersMap.get(user.username);
      return {
        ...user.toObject(),
        children: registeredUserData || null,
      };
    });

    // console.log("Filtered users from User collection:", matchingUsers);

    // Print the data to the console
    // console.log("Filtered registered users:", filteredUsers);

    res.json({
      success: true,
      message: "Data retrieval successful",
      users: filteredUsers,
    });
  } catch (error) {
    console.error("Error during getting registered users:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
