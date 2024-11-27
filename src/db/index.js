// Import mongoose for MongoDB interaction and dotenv for environment variable management
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI stored in environment variables (MONGODB_URI)
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );

    // Log successful connection and display the host information of the connected database
    console.log(
      `MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // If the connection fails, log the error and terminate the process with a failure code
    console.log("MongoDB connection FAILED", error);
    process.exit(1); // Exit with code 1 to indicate failure
  }
};

// Export the connectDB function to be used in other parts of the application
export default connectDB;
