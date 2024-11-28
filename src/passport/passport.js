// Import the LocalStrategy from passport-local for handling local authentication
import { Strategy as LocalStrategy } from "passport-local";

// Import the User model for accessing the authentication methods provided by the model
import User from "../models/user.js"; // Ensure the correct extension (.js) is included for local imports

/*
 * Function to initialize Passport.js with the local authentication strategy
 * and serialize/deserialize user methods
 */
function init(passport) {
  // Configure Passport to use the LocalStrategy with methods provided by the User model
  passport.use(new LocalStrategy(User.authenticate()));

  // Serialize the user to store in the session
  passport.serializeUser(User.serializeUser());

  // Deserialize the user from the session
  passport.deserializeUser(User.deserializeUser());
}

// Export the function for use in the application
export default init;
