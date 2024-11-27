// Import the necessary modules
import { Strategy as LocalStrategy } from "passport-local"; // Local strategy for Passport.js (used for username/password authentication)
import User from "../models/user.js"; // Import the User model to interact with the database

// Initialize Passport and configure the authentication strategy
function init(passport) {
  // Set up the local authentication strategy using Passport's LocalStrategy
  // This is the middleware that will handle user login using the 'username' and 'password' fields
  passport.use(new LocalStrategy(User.authenticate()));

  // Serialization is used to store the user information in the session after a successful login
  passport.serializeUser(User.serializeUser());

  // Deserialization is used to retrieve the user data from the session on each request
  passport.deserializeUser(User.deserializeUser());
}

// Export the init function to use in other parts of the application
export default init;
