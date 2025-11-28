import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const UserView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/${id}`,
        {
          headers: { Authorization: "Bearer " + auth.accessToken },
        }
      );
      setUser(res.data);
    } catch (err) {
      setFetchError("Failed to load user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading user...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600">
        <p className="text-lg">{fetchError}</p>
        <button
          onClick={() => navigate("/users")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Users
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        User not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/users")}
          className="text-blue-600 hover:underline mb-4 font-medium"
        >
          ← Back to Users
        </button>

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center">
          {user.profile_image ? (
            <img
              src={user.profile_image}
              alt="Profile"
              className="w-32 h-32 rounded-xl object-cover shadow mb-4"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-300 rounded-xl flex items-center justify-center text-gray-600 mb-4">
              No Image
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 mt-1">{user.email}</p>
        </div>

        <hr className="my-6" />

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="font-medium">{user.phone || "—"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">City</p>
            <p className="font-medium">{user.city || "—"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">State</p>
            <p className="font-medium">{user.state || "—"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Country</p>
            <p className="font-medium">{user.country || "—"}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Pincode</p>
            <p className="font-medium">{user.pincode || "—"}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-gray-500 text-sm">Address</p>
            <p className="font-medium">{user.address || "—"}</p>
          </div>

        </div>

        {/* EDIT BUTTON */}
        <div className="mt-8 flex justify-center">
          <Link
            to={`/users/${id}/edit`}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow"
          >
            Edit User
          </Link>
        </div>

      </div>
    </div>
  );
};

export default UserView;
