import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, adminOnly }) => {
  const { auth } = useContext(AuthContext);
  if (!auth) return <Navigate to="/login" />;

  if (adminOnly && auth.user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
