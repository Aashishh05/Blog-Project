import express from "express";
import authRoutes from "./authRoutes.js";
import blogRoutes from "./blogRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/blog", blogRoutes);

export default router;
