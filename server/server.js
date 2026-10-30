const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const profileRoutes = require("./routes/profileRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const educationRoutes = require("./routes/educationRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const certificationRoutes = require("./routes/certificationRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/achievements", achievementRoutes);
app.use( "/api/certifications", certificationRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio backend is running!",
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();