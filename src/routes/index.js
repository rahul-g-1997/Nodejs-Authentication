import express from "express";
import authController from "../controller/authController.js";
import isLoggedIn from "../middleware/guest.js";

const router = express.Router();

router.get("/signin", authController.signin);
router.post("/signin", authController.postSignin);
router.get("/", authController.signup);
router.post("/", authController.postSignup);
router.post("/logout", authController.logout);
router.get("/reset", authController.reset);
router.post("/reset", authController.resetPassword);
router.get("/home", isLoggedIn, authController.home);

console.log("router loaded");

export default router;
