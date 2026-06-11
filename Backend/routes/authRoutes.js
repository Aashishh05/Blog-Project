import express from "express";
import {
  loginAdmin,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",protect, logoutUser);
router.post("/admin/login", loginAdmin);

export default router;
