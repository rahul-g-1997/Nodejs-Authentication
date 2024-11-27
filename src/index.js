import "dotenv/config"; // Import and configure environment variables from the .env file
import connectDB from "./db/index.js"; // Import the function to connect to the database
import { app } from "./app.js"; // Import the Express application

const port = process.env.PORT || 3000; // Set the port from environment variables or default to 3000

// Attempt to connect to the database
connectDB()
  .then(() => {
    // If the connection is successful, set up the error handler for the app
    app.on("error", (error) => {
      console.log("Error", error); // Log any error that occurs within the app
      throw error; // Rethrow the error to stop further execution
    });

    // Start the server and listen on the specified port
    app.listen(port, () => {
      console.log(`Server listening on ${port}`); // Log a message when the server is running
    });
  })
  .catch((error) => {
    // If the connection to the database fails, log the error
    console.log("MongoDB Connection failed: " + error);
  });
