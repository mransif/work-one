const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/mongodb");
const studentRoutes = require("./routes/studentRoute");
const adminRoutes = require("./routes/adminRoute");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
}));

// API Routes
app.use("/api/user", studentRoutes);
app.use("/api/admin", adminRoutes);

// Update paths to serve from the public folder
const userFrontendPath = path.join(__dirname, 'public');
app.use(express.static(userFrontendPath));
app.get('/', (req, res) => {
  res.sendFile(path.join(userFrontendPath, 'index.html'));
});

// Update admin panel path
const adminPanelPath = path.join(__dirname, 'public/admin');
app.use('/admin', express.static(adminPanelPath));

// Serve index.html **only for real routes**, not assets
app.get('/admin/*', (req, res) => {
  if (req.path.includes('.')) {
    return res.status(404).end(); // let static handler take care of it
  }
  res.sendFile(path.join(adminPanelPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
