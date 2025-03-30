const express = require("express");
const { registerStudent, loginStudent, getMockTest, submitMockTest } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent)
router.get("/mocktest/:setName", getMockTest);
router.post("/submit-mocktest", submitMockTest);  

module.exports = router;
