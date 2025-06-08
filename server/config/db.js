const mongoose = require("mongoose");
require("dotenv").config(); // Load .env variables

const connectDB = async () => {
  try {
    // You can keep serverSelectionTimeoutMS if you want faster connection failover
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Optional: timeout after 5s
    });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Exit the process on failure
  }
};

module.exports = connectDB;
