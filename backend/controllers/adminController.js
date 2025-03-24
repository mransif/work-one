const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");

dotenv.config();

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find().select("-password");
    console.log(students)
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
