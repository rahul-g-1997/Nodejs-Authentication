// Import mongoose for defining the schema and interacting with MongoDB
import mongoose from "mongoose";

// Import passport-local-mongoose for handling authentication in Mongoose
import passportLocalMongoose from "passport-local-mongoose";

// Extract Schema from mongoose for easier usage
const { Schema } = mongoose;

// Define the user schema to structure user data in the database
const userSchema = new Schema(
  {
    // Username field: required and stored as a string
    username: { type: String, required: true },

    // Email field: required, unique, and stored as a string
    email: { type: String, required: true, unique: true },

    // Password field: optional and stored as a string (hashing will be handled by passport-local-mongoose)
    password: { type: String },
  },
  // Enable automatic timestamps for creation and update times
  { timestamps: true }
);

// Add passport-local-mongoose plugin to the schema
// This plugin simplifies password management by adding methods for hashing passwords, authentication, and more
userSchema.plugin(passportLocalMongoose);

// Create a model using the schema
// This provides an interface to interact with the 'users' collection in the database
const User = mongoose.model("User", userSchema);

// Export the model to use it in other parts of the application
export default User;
