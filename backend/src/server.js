import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";

import { auth } from "./middleware/auth.js";
import userRoutes from "./routes/userRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
// routes

app.get("/", (req, res) => {
  res.json({ message: "User Management API is running 🚀" });
});

// auth
app.use("/api/auth", authRoutes);

// users data
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

const connectServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
};

connectServer();
