import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthContext";

const UserEditModal = ({ open, onClose, userId, onUpdated }) => {
  const { auth } = useContext(AuthContext);

  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!open) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
        headers: { Authorization: "Bearer " + auth.accessToken },
      })
      .then((res) => {
        setForm(res.data);
        setPreview(res.data.profile_image);
      });
  }, [open]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    for (let key in form) fd.append(key, form[key]);
    if (image) fd.append("profile_image", image);

    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
      fd,
      { headers: { Authorization: "Bearer " + auth.accessToken } }
    );

    onUpdated();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>

      <form onSubmit={onSubmit} className="space-y-4">

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-28 h-28 rounded-xl object-cover"
          />
        )}

        <input
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <input
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <input
          name="address"
          value={form.address || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
          Update
        </button>
      </form>
    </Modal>
  );
};

export default UserEditModal;
