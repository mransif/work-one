const express = require("express");
const { registerStudent, loginStudent, getMockTest } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent)
router.get("/mocktest/:setName", getMockTest);

module.exports = router;
