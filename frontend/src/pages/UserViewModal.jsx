import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthContext";

const UserViewModal = ({ open, onClose, userId }) => {
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!open) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
        headers: { Authorization: "Bearer " + auth.accessToken }
      })
      .then((res) => setUser(res.data));
  }, [open]);

  if (!open) return null;

  if (!user) {
    return (
      <Modal open={open} onClose={onClose}>
        <p>Loading...</p>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">User Details</h2>

      <img
        src={user.profile_image}
        alt="profile"
        className="w-28 h-28 rounded-xl object-cover mb-4"
      />

      <div className="space-y-1 text-gray-700">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Address:</b> {user.address}</p>
        <p><b>City:</b> {user.city}</p>
        <p><b>State:</b> {user.state}</p>
        <p><b>Country:</b> {user.country}</p>
        <p><b>Pincode:</b> {user.pincode}</p>
      </div>
    </Modal>
  );
};

export default UserViewModal;
