const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const mockTestModel = require("../models/mockTestModel");


exports.registerStudent = async (req, res) => {
  const { name, email, phone, address, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    await newUser.save();
    console.log(newUser);
    res.status(201).json({ success: true, message: "Student registered successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.loginStudent = async (req, res) => {
  const { email, password } = req.body

  try {
    const student = await User.findOne({ email })
    if (!student) return res.status(400).json({ success: false, message: "Invalid credentials" })

    const isMatch = await bcrypt.compare(password, student.password)
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" })

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.status(200).json({ success: true, token })

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// api to get questions
exports.getMockTest = async (req, res) => {
  const { setName } = req.params;

  try {
    const mockTest = await mockTestModel.findOne({ setName });

    if (!mockTest) {
      return res.status(404).json({ message: "Mock test not found" });
    }

    res.status(200).json(mockTest);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
