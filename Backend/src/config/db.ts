import mongoose from "mongoose";
import { config } from "dotenv";
config()

const MONGO_URI = process.env.MONGO_URI;
export const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      console.log("Mongo url is missing...");
      return;
    }
    await mongoose.connect(MONGO_URI);
    console.log("Succesfully Connected to mongodb");
  } catch (error: any) {
    console.error(" MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

