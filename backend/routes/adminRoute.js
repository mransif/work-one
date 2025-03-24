const express = require("express");
const { loginAdmin, getAllStudents } = require("../controllers/adminController");
const authAdmin = require("../middlewares/authAdmin");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/students", authAdmin, getAllStudents);

module.exports = router;
