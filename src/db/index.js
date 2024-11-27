// Import mongoose for MongoDB interaction and dotenv for environment variable management
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI stored in environment variables
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    // Log successful connection and the host information
    console.log(
      `MongiDB connected !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // Log any error and exit the process with failure code
    console.log("mongodb connection FAILED", error);
    process.exit(1);
  }
};
// Export the function for use in other parts of the application
export default connectDB;
