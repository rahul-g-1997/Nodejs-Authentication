import User from "../models/user.js";
import passport from "passport";

const authController = {
  // ************************************  SIGN IN SETUP  *********************************//
  // Renders the sign-in page and passes any flash messages for feedback
  signin(req, resp) {
    resp.render("auth/signin", { messages: req.flash() });
  },

  // Handles the POST request for sign-in, authenticates the user via passport
  postSignin(req, resp, next) {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
      req.flash("error", "All fields are required");
      return resp.redirect("/signin");
    }

    // Passport authentication using the local strategy
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        req.flash("error", info.message);
        return next(err);
      }
      if (!user) {
        req.flash("error", info.message);
        return resp.redirect("/signin");
      }

      // Log the user in if authentication is successful
      req.logIn(user, (err) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        return resp.redirect("/home");
      });
    })(req, resp, next);
  },

  // Renders the home page after successful login
  home(req, resp) {
    resp.render("auth/home", { messages: req.flash() });
  },

  // ******************************************   SIGNUP SETUP  ********************************//
  // Renders the signup page
  signup(req, resp) {
    resp.render("auth/signup", { messages: req.flash() });
  },

  // Handles the POST request for user signup
  async postSignup(req, resp) {
    const { username, email, password } = req.body;

    // Validate that all fields are provided
    if (!username || !email || !password) {
      req.flash("error", "All fields are required");
      req.flash("username", username);
      req.flash("email", email);
      return resp.redirect("/");
    }

    try {
      // Check if the email already exists
      const emailExists = await User.exists({ email: email });
      if (emailExists) {
        req.flash("error", "Email already taken");
        req.flash("username", username);
        req.flash("email", email);
        return resp.redirect("/");
      }

      // Create a new user and register them (password will be hashed)
      const newUser = new User({ username, email });
      await User.register(newUser, password);
      return resp.redirect("/signin");
    } catch (err) {
      console.error("Signup Error:", err);
      req.flash("error", "Something went wrong");
      return resp.redirect("/");
    }
  },

  // Renders the password reset page
  reset(req, resp) {
    resp.render("auth/reset", { messages: req.flash() });
  },

  // Handles the password reset process
  resetPassword(req, resp) {
    const { username, oldpassword, newpassword } = req.body;

    // Check if the username is provided
    if (!username) {
      req.flash("error", "Please enter your username");
      return resp.redirect("/reset");
    }

    // Find the user by username
    User.findByUsername(username, (err, user) => {
      if (err || !user) {
        req.flash("error", "Username not found. Please check your username.");
        return resp.redirect("/reset");
      }

      // Attempt to change the password
      user.changePassword(oldpassword, newpassword, function (err) {
        if (err) {
          console.log(err);
          req.flash("error", "Error changing password. Please try again.");
          return resp.redirect("/reset");
        } else {
          req.flash("success", "Password changed successfully!");
          return resp.redirect("/signin");
        }
      });
    });
  },

  // Handles user logout by destroying the session
  logout(req, resp, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      return resp.redirect("/signin");
    });
  },
};

export default authController;
