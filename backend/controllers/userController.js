const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const mockTestModel = require("../models/mockTestModel");
const mockTestResultModel = require("../models/mockTestResultModel ");


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
  const { email, password } = req.body;

  try {
    const student = await User.findOne({ email });
    if (!student) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send the token and userId
    res.status(200).json({
      success: true,
      token,
      userId: student._id // Include userId
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


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

exports.submitMockTest = async (req, res) => {
  const { studentId, setName, score, questions } = req.body;

  try {
    // Check if the student exists
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    const result = new mockTestResultModel({
      studentId,
      setName,
      score,
      questions,
    });

    await result.save();
    res.status(201).json({ success: true, message: "Test result saved successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getMockTestScores = async (req, res) => {
  const { studentId } = req.params;  // Get student ID from URL parameters

  try {
    // Find all mock test results for the given student ID
    const scores = await mockTestResultModel.find({ studentId });

    if (!scores || scores.length === 0) {
      return res.status(404).json({ success: false, message: "No mock test scores found" });
    }

    res.status(200).json({ success: true, scores });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

