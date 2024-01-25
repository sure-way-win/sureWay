const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Children = require("../models/childModel");

router.get("/registeredUsers", async (req, res) => {
  try {
    const { agency } = req.query; // Assuming the agency parameter is passed in the query string
    console.log(agency);
    if (!agency) {
      return res
        .status(400)
        .json({ success: false, message: "Agency parameter is required" });
    }

    const registeredUsers = await Children.find({
      isVerified: 1,
      Agency: agency,
    });
    console.log("This is registered users", registeredUsers);

    const parentNames = registeredUsers.map((user) => user.parent_username);
    const names = registeredUsers.map((user) => user.name);

    const matchingUsers = await User.find({
      username: { $in: parentNames },
    }).select("-children -ChildAddRequest -hashedPassword -_id -isVerified");

    const registeredUsersMap = new Map();

    registeredUsers.forEach((user) => {
      const existingData = registeredUsersMap.get(user.parent_username) || [];
      existingData.push(user.name);
      registeredUsersMap.set(user.parent_username, existingData);
    });
    // console.log(registeredUsersMap);

    const filteredUsers = matchingUsers.map(async (user) => {
      const registeredUserData = registeredUsersMap.get(user.username) || [];
      const childrenData = await Children.find({
        parent_username: user.username,
        name: { $in: names },
      }).select("-_id -isVerified -Agency -parentName");
      // console.log(childrenData);
      return {
        ...user.toObject(),
        children: registeredUserData,
        childrenData: childrenData,
      };
    });

    // Wait for all promises to resolve
    const result = await Promise.all(filteredUsers);

    // Sending the response as JSON
    res.json({
      success: true,
      message: "Data retrieval successful",
      users: result,
    });
  } catch (error) {
    console.error("Error during getting registered users:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
