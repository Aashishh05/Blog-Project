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

const router = express.Router();

router.post("/create", createBlog);
router.get("/get", getAllBlogs);
router.get("/get/:id", getBlogById);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);
router.post("/like", likeBlog);
router.get("/liked/me", getLikedBlogs);

export default router;
