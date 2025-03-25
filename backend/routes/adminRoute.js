const express = require("express");
const { loginAdmin, getAllStudents, addQuestion, deleteQuestion } = require("../controllers/adminController");
const authAdmin = require("../middlewares/authAdmin");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/students", authAdmin, getAllStudents);
router.post("/add-question", addQuestion);
router.delete("/delete-question/:setName/:questionId", deleteQuestion); 

module.exports = router;
