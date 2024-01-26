const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AdminMini = require("../models/AdminMini");

const verifyAdmin = async (username, password, verificationCode) => {
  try {
    const foundUser = await AdminMini.findOne({ username });

    if (!foundUser) {
      console.log("User not found");
      return { error: "User not found" };
    }

    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
    const isCodeMatch = String(foundUser._id) === verificationCode; // Convert ObjectId to string for comparison

    if (isPasswordMatch && isCodeMatch) {
      await AdminMini.findByIdAndUpdate(foundUser._id, { isVerified: true });
      console.log("Admin verified successfully");
      return { success: "Admin verified successfully" };
    } else {
      if (!isPasswordMatch) {
        console.log("Incorrect password");
        return { error: "Incorrect password" };
      } else {
        console.log("Verification code is wrong");
        return { error: "Verification code is wrong" };
      }
    }
  } catch (error) {
    console.error("Error during admin verification:", error.message);
    return { error: "Internal Server Error" };
  }
};

module.exports = verifyAdmin;
