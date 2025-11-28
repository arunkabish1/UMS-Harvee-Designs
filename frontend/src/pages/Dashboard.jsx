import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* NAVBAR */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>

        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-gray-600 font-medium">
              Hi, {user?.name || "Admin"}
            </span>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome, Admin 👋</h2>
          <p className="text-gray-600 mb-6">
            Use the tools below to manage application data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Link
              to="/users"
              className="bg-blue-600 text-white p-4 rounded-xl text-center font-semibold hover:bg-blue-700 transition shadow"
            >
              Manage Users
            </Link>

          </div>
        </div>
      </main>

    </div>
  );
};

export default Dashboard;
