const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.registerStudent = async (req, res) => {
  const { name, email, phone, address, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Student registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
