import express from "express";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/role.js";
import { upload } from "../middleware/upload.js";

import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// GET all users
router.get("/", auth, isAdmin, getUsers);

// GET single user by ID
router.get("/:id", auth, isAdmin, getUserById);

// UPDATE user (PUT + image upload)
router.put("/:id", auth, isAdmin, upload.single("profile_image"), updateUser);

// DELETE user
router.delete("/:id", auth, isAdmin, deleteUser);

export default router;
