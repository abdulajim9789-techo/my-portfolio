
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
      serverSelectionTimeoutMS: 15000,
    });

    console.log("✅ MongoDB connected successfully!");
    console.log(`📦 Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed!");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    if (error.reason?.servers) {
      for (const [address, server] of error.reason.servers) {
        console.error("Server:", address);
        console.error("Server type:", server.type);
        console.error(
          "Server error:",
          server.error?.message || "No additional details"
        );
      }
    }

    throw error;
  }
};

module.exports = connectDB;

