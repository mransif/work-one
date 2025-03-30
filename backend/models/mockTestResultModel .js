const mongoose = require("mongoose");

const mockTestResultSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  setName: { type: String, required: true },
  score: { type: Number, required: true },
  questions: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MockTestResult", mockTestResultSchema);
