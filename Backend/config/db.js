import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV_VARS.MONGO_URL);
  } catch (error) {
    console.log("error connecting to mongodb: " + error.message);
    process.exit(1);
  }
};
