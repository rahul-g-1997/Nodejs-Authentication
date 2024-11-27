// Import mongoose for MongoDB schema definition and passport-local-mongoose for user authentication
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// Destructure Schema from mongoose for easier use
const { Schema } = mongoose;

// Define the user schema for MongoDB
const userSchema = new Schema(
  {
    // 'username' is required and stored as a string
    username: { type: String, required: true },

    // 'email' is required, must be unique, and stored as a string
    email: { type: String, required: true, unique: true },

    // 'password' is stored as a string (it's managed by passport-local-mongoose)
    password: { type: String },
  },
  {
    // Add timestamps to track when documents are created or updated
    timestamps: true,
  }
);

// Use the passportLocalMongoose plugin to add username/password authentication methods
userSchema.plugin(passportLocalMongoose);

// Create a model called 'User' from the schema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
export default User;
