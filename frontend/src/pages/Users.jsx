import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import UserViewModal from "./UserViewModal";
import UserEditModal from "./UserEditModal";

const Users = () => {
  const { auth, logout } = useContext(AuthContext);
const [viewOpen, setViewOpen] = useState(false);
const [editOpen, setEditOpen] = useState(false);
const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setFetchError("");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          headers: {
            Authorization: "Bearer " + auth.accessToken,
          },
          params: { search },
        }
      );

      setUsers(res.data.users || []);
    } catch (err) {
      setFetchError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);
const openView = (id) => {
  setSelectedUserId(id);
  setViewOpen(true);
};

const openEdit = (id) => {
  setSelectedUserId(id);
  setEditOpen(true);
};
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
        headers: { Authorization: "Bearer " + auth.accessToken },
      });
      fetchUsers();
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  return (
    <><div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Users List</h2>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow"
        >
          Logout
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-xl shadow mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or email..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
      </div>

      {/* ERROR */}
      {fetchError && (
        <p className="text-red-500 font-medium mb-3">{fetchError}</p>
      )}

      {/* LOADING */}
      {loading && (
        <div className="text-center py-10 text-gray-600">Loading users...</div>
      )}

      {/* EMPTY STATE */}
      {!loading && users.length === 0 && (
        <div className="text-center py-10 text-gray-600">
          No users found.
        </div>
      )}

      {/* USERS TABLE */}
      {!loading && users.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">City</th>
                <th className="px-5 py-3">State</th>
                <th className="px-5 py-3">Image</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, index) => (
                <tr
                  key={u._id}
                  className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="px-5 py-4 font-medium">{u.name}</td>
                  <td className="px-5 py-4">{u.email}</td>
                  <td className="px-5 py-4">{u.city}</td>
                  <td className="px-5 py-4">{u.state}</td>

                  <td className="px-5 py-4">
                    {u.profile_image ? (
                      <img
                        src={u.profile_image}
                        className="w-12 h-12 object-cover rounded-full shadow"
                        alt="User" />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>

                  <td className="px-5 py-4 flex items-center gap-4">
                    <button
                      onClick={() => openView(u._id)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>

                    <button
                      onClick={() => openEdit(u._id)}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div><UserViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        userId={selectedUserId} /><UserEditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        userId={selectedUserId}
        onUpdated={fetchUsers} /></>

  );
};

export default Users;
