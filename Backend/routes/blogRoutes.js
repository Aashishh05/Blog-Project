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
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/create", protect, upload.single("image"), adminOnly, createBlog);
router.get("/get",getAllBlogs);
router.get("/get/:id", getBlogById);
router.put(
  "/update/:id",
  protect,
  upload.single("image"),
  adminOnly,
  updateBlog,
);
router.delete("/delete/:id", protect, adminOnly, deleteBlog);
router.post("/like", protect, likeBlog);
router.get("/liked/me", protect, getLikedBlogs);

export default router;
