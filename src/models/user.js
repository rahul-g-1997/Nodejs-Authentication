// Import mongoose for defining the schema and interacting with MongoDB
import mongoose from "mongoose";

// Import passport-local-mongoose for handling authentication in Mongoose
import passportLocalMongoose from "passport-local-mongoose";

// Extract Schema from mongoose for easier usage
const { Schema } = mongoose;

// Define the user schema to structure user data in the database
const userSchema = new Schema(
  {
    username: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String },
  },

  { timestamps: true }
);

// This plugin simplifies password management by adding methods for hashing passwords, authentication, and more
userSchema.plugin(passportLocalMongoose);

// Create a model using the schema
const User = mongoose.model("User", userSchema);

// Export the model to use it in other parts of the application
export default User;
