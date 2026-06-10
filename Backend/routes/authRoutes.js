import express, { Router } from "express";
import {
  loginAdmin,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/admin/login", loginAdmin);

export default router;
