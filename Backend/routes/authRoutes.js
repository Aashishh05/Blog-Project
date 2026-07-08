import express from "express";
import {
  
  loginUser,
  logoutUser,
  registerUser,
  verifyOTP,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",protect, logoutUser);

router.post("/verify-otp",verifyOTP);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword);


export default router;
