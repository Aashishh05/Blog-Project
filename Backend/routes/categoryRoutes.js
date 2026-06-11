import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, adminOnly, createCategory);
router.get("/get", getAllCategory);
router.get("/get/:id", getCategoryById);
router.put("/update/:id", protect, adminOnly, updateCategory);
router.delete("/delete/:id", protect, adminOnly, deleteCategory);

export default router;
