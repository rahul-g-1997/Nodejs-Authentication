import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user.js"; // Ensure the correct extension (.js) is included for local imports

function init(passport) {
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}

export default init;
