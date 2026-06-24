import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { getLikedBlogs, likeBlog } from "../controllers/blogController.js";

const router = express.Router();

router.post("/like/:id",protect,likeBlog);
router.get("/liked/:id", protect, getLikedBlogs);


export default router;