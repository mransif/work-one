const mongoose = require("mongoose");

const mockTestSchema = new mongoose.Schema({
  setName: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [String],
      correctAnswer: { type: String, required: true }
    }
  ],
});

module.exports = mongoose.model("MockTest", mockTestSchema);
