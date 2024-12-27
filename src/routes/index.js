// Import the required modules
import express from "express"; 
import authController from "../controller/authController.js"; 
import isLoggedIn from "../middleware/guest.js"; 

// Initialize the router
const router = express.Router();



/* Route to display the sign-in page */
router.get("/signin", authController.signin);

/* Route to handle sign-in form submission */
router.post("/signin", authController.postSignin);

/* Route to display the sign-up page */
router.get("/", authController.signup);

/* Route to handle sign-up form submission */
router.post("/", authController.postSignup);

/* Route to handle user logout */
router.post("/logout", authController.logout);

/* Route to display the password reset page */
router.get("/reset", authController.reset);

/* Route to handle password reset form submission */
router.post("/reset", authController.resetPassword);

/* Route to display the home page; only accessible to logged-in users */
router.get("/home", isLoggedIn, authController.home);

// Debugging log to confirm the router is loaded
console.log("router loaded");

// Export the router for use in the application
export default router;
