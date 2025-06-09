const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Optional: timeout after 5s, Agar 5 seconds tak MongoDB connect nahi hoti, toh app close ho jayegi
    });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Exit the process on failure
  }
};

module.exports = connectDB;