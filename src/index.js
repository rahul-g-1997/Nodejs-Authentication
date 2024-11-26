// Importing the dotenv configuration to access environment variables from the .env file
import "dotenv/config";

// Importing the database connection function
import connectDB from "./db/index.js";

// Importing the main Express application instance
import { app } from "./app.js";

// Defining the port for the server, defaulting to 3000 if not set in .env
const port = process.env.PORT || 3000;

// Connecting to the MongoDB database
connectDB()
  .then(() => {
    // Handling application errors
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });

    // Starting the server and listening on the specified port
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  })
  .catch((error) => {
    // Logging if MongoDB connection fails
    console.log("MongoDB Connection failed: " + error);
  });
