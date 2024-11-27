import User from "../models/user.js";
import passport from "passport";

const authController = () => {
  return {
    // Render the signin page
    signin(req, resp) {
      resp.render("auth/signin", { messages: req.flash() });
    },

    // Handle signin form submission
    postSignin(req, resp, next) {
      const { username, password } = req.body;

      // Validate input fields
      if (!username || !password) {
        req.flash("error", "All fields are required");
        return resp.redirect("/signin");
      }

      // Authenticate using Passport.js
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info?.message || "An error occurred");
          return next(err);
        }
        if (!user) {
          req.flash("error", info?.message || "Invalid credentials");
          return resp.redirect("/signin");
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", "Failed to log in");
            return next(err);
          }
          return resp.redirect("/home");
        });
      })(req, resp, next);
    },

    // Render the home page
    home(req, resp) {
      resp.render("auth/home", { messages: req.flash() });
    },

    // Render the signup page
    signup(req, resp) {
      resp.render("auth/signup", { messages: req.flash() });
    },

    // Handle signup form submission
    async postSignup(req, resp) {
      const { username, email, password } = req.body;

      // Validate input fields
      if (!username || !email || !password) {
        req.flash("error", "All fields are required");
        req.flash("username", username);
        req.flash("email", email);
        return resp.redirect("/signup");
      }

      // Check if the email is already taken
      try {
        const exists = await User.exists({ email });
        if (exists) {
          req.flash("error", "Email already taken");
          req.flash("username", username);
          req.flash("email", email);
          return resp.redirect("/signup");
        }

        // Register the new user
        User.register({ username, email }, password, function (err) {
          if (err) {
            req.flash("error", "Something went wrong during registration");
            return resp.redirect("/signup");
          }
          return resp.redirect("/signin");
        });
      } catch (err) {
        req.flash("error", "An unexpected error occurred");
        return resp.redirect("/signup");
      }
    },

    // Render the reset password page
    reset(req, resp) {
      resp.render("auth/reset", { messages: req.flash() });
    },

    // Handle password reset functionality
    resetPassword(req, resp) {
      User.findByUsername(req.body.username, (err, user) => {
        if (err || !user) {
          req.flash("error", "User not found");
          return resp.redirect("/reset");
        }

        // Change password using the old and new passwords
        user.changePassword(
          req.body.oldpassword,
          req.body.newpassword,
          (err) => {
            if (err) {
              req.flash("error", "Password reset failed");
              return resp.redirect("/reset");
            }
            req.flash("success", "Password successfully changed");
            return resp.redirect("/signin");
          }
        );
      });
    },

    // Logout the user
    logout(req, resp, next) {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        return resp.redirect("/");
      });
    },
  };
};

export default authController;
