import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createComment,
  deleteComment,
  getAllComment,
  getCommentsByBlog,
  updateComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/create", protect, createComment);
router.get("/getcomment", protect, getAllComment);
router.get("/blog/:blogId", getCommentsByBlog);
router.put("/update/:id", protect, updateComment);
router.delete("/delete/:id", protect, deleteComment);

export default router;
