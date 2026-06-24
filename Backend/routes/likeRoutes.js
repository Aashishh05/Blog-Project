import express from "express"
import { protect } from "../middleware/authMiddleware";
import { getLikedBlogs, likeBlog } from "../controllers/blogController";

const router = express.Router();

router.post("/like",protect,likeBlog);
router.get("/liked", protect, getLikedBlogs);


export default router;