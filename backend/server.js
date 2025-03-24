const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/mongodb");
const studentRoutes = require("./routes/studentRoute");
const adminRoutes = require("./routes/adminRoute");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
