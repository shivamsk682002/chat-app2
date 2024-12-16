import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();
const connectToMongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

export default connectToMongoDB;
