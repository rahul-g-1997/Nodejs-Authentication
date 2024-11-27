// Import necessary modules
import express from "express"; // Express framework to handle routing
import authController from "../controller/authController.js"; // Auth controller to manage authentication logic
import isLoggedIn from "../middleware/guest.js"; // Middleware to check if the user is logged in

// Create an Express router instance to define routes
const router = express.Router();

// Route to show the sign-in page (GET request)
router.get("/signin", authController().signin);

// Route to handle the sign-in form submission (POST request)
router.post("/signin", authController().postSignin);

// Route to show the sign-up page (GET request)
router.get("/", authController().signup);

// Route to handle the sign-up form submission (POST request)
router.post("/", authController().postSignup);

// Route to handle user logout (POST request)
router.post("/logout", authController().logout);

// Route to show the password reset page (GET request)
router.get("/reset", authController().reset);

// Route to handle the password reset form submission (POST request)
router.post("/reset", authController().resetPassword);

// Route to show the home page, but only if the user is logged in (GET request)
// The 'isLoggedIn' middleware ensures the user is authenticated before accessing this route
router.get("/home", isLoggedIn, authController().home);

// Log message to confirm that the router is loaded and active
console.log("router loaded");

// Export the router to use it in the main app file (e.g., app.js)
export default router;
