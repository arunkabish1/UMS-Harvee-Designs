import { User } from "../models/User.js";

// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const { search, state, city, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    if (state) filter.state = state;
    if (city) filter.city = city;

    const users = await User.find(filter)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      users,
    });
  } catch (err) {
    console.error("Get Users Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const imageUrl = req.file ? req.file.path : undefined;

    const updateData = {
      ...req.body,
      ...(imageUrl && { profile_image: imageUrl }),
    };

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    if (!user)
      return res.status(404).json({
        message: "Id may be incorrect or user not found",
      });

    res.json({ message: "User Updated", user });
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user)
      return res.status(404).json({
        message: "Id may be incorrect or user not found",
      });

    res.json({ message: "User Deleted Successfully", user });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};
