import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    console.log(authHeader);
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) return res.status(400).json({ message: "Unauthorized" });

    const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = { id: decode.id, role: decode.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "error: " + err });
  }
};
