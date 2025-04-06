const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const MockTest = require("../models/mockTestModel");  // Import mock test model
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

    // Removed the expiresIn option from jwt.sign
    const token = jwt.sign({ email }, process.env.JWT_SECRET);

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

// ✅ Add Question
exports.addQuestion = async (req, res) => {
  const { setName, questions } = req.body;  // Destructure questions array

  try {
    let mockTest = await MockTest.findOne({ setName });

    if (!mockTest) {
      mockTest = new MockTest({ setName, questions: [] });
    }

    // Add multiple questions
    mockTest.questions.push(...questions);
    
    await mockTest.save();

    res.status(201).json({ message: "Questions added successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ Delete Question
exports.deleteQuestion = async (req, res) => {
  const { setName, questionId } = req.params;

  try {
    const mockTest = await MockTest.findOne({ setName });

    if (!mockTest) {
      return res.status(404).json({ message: "Mock test not found" });
    }

    mockTest.questions = mockTest.questions.filter(q => q._id.toString() !== questionId);
    await mockTest.save();

    res.status(200).json({ message: "Question deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};