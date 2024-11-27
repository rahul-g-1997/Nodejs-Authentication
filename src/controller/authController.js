import User from "../models/user.js";
import passport from "passport";

const authController = () => {
  return {
    // ************************************  SIGN IN SETUP  *********************************//
    signin(req, resp) {
      resp.render("auth/signin", { messages: req.flash() }); // Pass flash messages
    },

    postSignin(req, resp, next) {
      const { username, password } = req.body;
      // Validate request
      if (!username || !password) {
        req.flash("error", "All fields are required");
        return resp.redirect("/signin");
      }
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return resp.redirect("/signin");
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }

          return resp.redirect("/home");
        });
      })(req, resp, next);
    },

    home(req, resp) {
      resp.render("auth/home", { messages: req.flash() }); // Pass flash messages
    },

    // ******************************************   SIGNUP SETUP  ********************************//
    signup(req, resp) {
      resp.render("auth/signup", { messages: req.flash() }); // Pass flash messages
    },

    postSignup(req, resp) {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        req.flash("error", "All fields are required");
        req.flash("username", username);
        req.flash("email", email);
        return resp.redirect("/");
      }
      // Check if email exists
      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "Email already taken");
          req.flash("username", username);
          req.flash("email", email);
          return resp.redirect("/");
        }
      });
      User.register(
        {
          username: req.body.username,
          email: req.body.email,
        },
        req.body.password,
        function (err) {
          if (err) {
            req.flash("error", "Something went wrong");
            return resp.redirect("/");
          } else {
            return resp.redirect("/signin");
          }
        }
      );
    },

    // *****************************************   RESET PASSWORD SETUP  *************************//
    reset(req, resp) {
      resp.render("auth/reset", { messages: req.flash() }); // Pass flash messages
    },

    resetPassword(req, resp) {
      User.findByUsername(req.body.username, (err, user) => {
        if (err) {
          req.flash("error", "Please check your password");
        } else {
          user.changePassword(
            req.body.oldpassword,
            req.body.newpassword,
            function (err) {
              if (err) {
                return resp.redirect("/reset");
              } else {
                return resp.redirect("/signin");
              }
            }
          );
        }
      });
    },

    // ************************************   LOGOUT   ********************************//
    logout(req, resp, next) {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        return resp.redirect("/");
      });
    },
  };
};

export default authController;
