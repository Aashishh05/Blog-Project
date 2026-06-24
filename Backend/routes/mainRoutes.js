import express from "express";
import authRoutes from "./authRoutes.js";
import blogRoutes from "./blogRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import likeRoutes from "./likeRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/blog", blogRoutes);
router.use("/category", categoryRoutes);
router.use("/likedblog", likeRoutes);

export default router;
