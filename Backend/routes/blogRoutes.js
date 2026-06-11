import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getLikedBlogs,
  likeBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, adminOnly, createBlog);
router.get("/get", getAllBlogs);
router.get("/get/:id", getBlogById);
router.put("/update/:id", protect, adminOnly, updateBlog);
router.delete("/delete/:id", protect, adminOnly, deleteBlog);
router.post("/like", protect, likeBlog);
router.get("/liked/me", protect, getLikedBlogs);

export default router;
