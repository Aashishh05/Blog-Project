import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import mainRoutes from "./routes/mainRoutes.js";
import cookieParser from "cookie-parser";
import cloudinary from "./config/cloudinary.js";
import cors from "cors";
dotenv.config();

connectDB();
const app = express();

app.use(
  cors({
    origin: `http://localhost:5173`,
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
