import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import mainRoutes from "./routes/mainRoutes.js";
import cookieParser from "cookie-parser";
import cloudinary from "./config/cloudinary.js";
import cors from "cors";
import path from "path";
dotenv.config();

connectDB();
const app = express();

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://blog-project-aashish11.vercel.app",
        "https://blog-project-git-main-aashish11.vercel.app",
        "https://blog-project-1v3ub8l65-aashish11.vercel.app",
      ];

      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", mainRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ message: "API is running......" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
