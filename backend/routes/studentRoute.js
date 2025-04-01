const express = require("express");
const { registerStudent, loginStudent, getMockTest, submitMockTest, getMockTestScores, getMainTestScores, submitMainTest } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent)
router.get("/mocktest/:setName", getMockTest);
router.post("/submit-mocktest", submitMockTest);
router.get("/mocktest-scores/:studentId", getMockTestScores);
router.post("/submit-maintest", submitMainTest);
router.get("/maintest-scores/:studentId", getMainTestScores);

module.exports = router;