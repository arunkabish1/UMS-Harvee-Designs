import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { Navigate } from "react-router-dom";
import Register from "./pages/Register";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />}></Route>

      <Route
        path="/dashboard"
        element={
          <PrivateRoute adminOnly>
            {" "}
            <Dashboard />{" "}
          </PrivateRoute>
        }
      ></Route>

      <Route
        path="/dashboard"
        element={
          <PrivateRoute adminOnly>
            {" "}
            <Users />{" "}
          </PrivateRoute>
        }
      ></Route>

      

      <Route
        path="/users"
        element={
          <PrivateRoute adminOnly>
            <Users />
          </PrivateRoute>
        }
      />

      
    </Routes>
  );
}
