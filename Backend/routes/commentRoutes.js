import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createComment,
  deleteComment,
  getAllComment,
  updateComment,
} from "../controllers/commentController.js";
import { getBlogById } from "../controllers/blogController.js";

const router = express.Router();

router.post("/create", protect, createComment);
router.get("/getcomment", protect, getAllComment);
router.get("/blog/:blogId", protect, getBlogById);
router.put("/update/:id", protect, updateComment);
router.delete("/delete/:id", protect, deleteComment);

export default router;
