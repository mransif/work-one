const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package
const connectDB = require("./config/mongodb");
const studentRoutes = require("./routes/studentRoute");
const adminRoutes = require("./routes/adminRoute");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Enable CORS for all origins or specify allowed origins
app.use(cors({
  origin: 'http://localhost:5174',
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
}));

// Routes
app.use("/api/user", studentRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API working');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
