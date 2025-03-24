const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const User = require("../models/userModel");

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find().select("-password");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
