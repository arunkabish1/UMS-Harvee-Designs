import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { registerValidator  } from "../validators/authValidator.js";
import jwt from 'jsonwebtoken'


export const login = async (req, res) => {
  try {
   
    const { email_or_phone, password } = req.body;
 console.log("Incoming:", email_or_phone);


    const user = await User.findOne({
      $or: [{ email: email_or_phone }, { phone: email_or_phone }],
    });
console.log("DB phone:", JSON.stringify(user?.phone));
console.log("DB email:", JSON.stringify(user?.email));
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    const { password: _, ...userData } = user._doc;

    res.json({
      message: "Login successful",
      user: userData,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const register = async (req, res) => {
  try {
    const { error } = registerValidator.validate(req.body);
    
    if (error) return res.status(400).json({ message: error.message });

    const { email, password, phone } = req.body;

    const existOrNOt = await User.findOne({ $or: [{ email }, { phone }] });

    if (existOrNOt)
      return res
        .status(400)
        .json({ message: "Email or Phone Number is already Existed" });

    const hashPassword = await bcrypt.hash(password, 10);

    const imageUrl = req.file ? req.file.path : null;

    const user = await User.create({
      ...req.body,
      password: hashPassword,
      profile_image: imageUrl,
    });

    const { password: _, ...userData } = user._doc;

    res.status(201).json({
      message: "User Created Successfully",
      user: userData,
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

