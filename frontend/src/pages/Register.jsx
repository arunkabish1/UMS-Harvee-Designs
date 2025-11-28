import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    state: "",
    city: "",
    country: "",
    pincode: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setError("Only JPG / PNG images allowed");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be ≤2MB");
      return;
    }
    setError("");

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const basicValidation = () => {
    if (form.name.trim().length < 3) return "Name must be at least 3 characters";
    if (!/^[A-Za-z\s]+$/.test(form.name)) return "Name must contain alphabets only";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email";
    if (!/^\d{10,15}$/.test(form.phone)) return "Phone must be 10–15 digits";
    if (form.password.length < 6 || !/\d/.test(form.password))
      return "Password must be 6+ chars and contain a number";
    if (!form.city || !form.state || !form.country) return "City/State/Country required";
    if (!/^\d{4,10}$/.test(form.pincode)) return "Pincode must be 4–10 digits";
    if (form.address && form.address.length > 150) return "Address max length 150 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = basicValidation();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const fd = new FormData();
      Object.keys(form).forEach((k) => fd.append(k, form[k]));
      if (imageFile) fd.append("profile_image", imageFile);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white w-full max-w-3xl shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* FORM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* NAME */}
            <div>
              <label className="font-medium text-gray-700">Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="font-medium text-gray-700">Email *</label>
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="you@email.com"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="font-medium text-gray-700">Phone *</label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="10–15 digits"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="font-medium text-gray-700">Password *</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Minimum 6 chars"
              />
            </div>

            {/* ADDRESS */}
            <div className="md:col-span-2">
              <label className="font-medium text-gray-700">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={onChange}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Street, Area..."
              />
            </div>

            {/* CITY */}
            <div>
              <label className="font-medium text-gray-700">City *</label>
              <input
                name="city"
                value={form.city}
                onChange={onChange}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* STATE */}
            <div>
              <label className="font-medium text-gray-700">State *</label>
              <input
                name="state"
                value={form.state}
                onChange={onChange}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* COUNTRY */}
            <div>
              <label className="font-medium text-gray-700">Country *</label>
              <input
                name="country"
                value={form.country}
                onChange={onChange}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PINCODE */}
            <div>
              <label className="font-medium text-gray-700">Pincode *</label>
              <input
                name="pincode"
                value={form.pincode}
                onChange={onChange}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PROFILE IMAGE */}
            <div className="md:col-span-2">
              <label className="font-medium text-gray-700">
                Profile Image (JPG/PNG ≤2MB)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="mt-2"
              />

              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg shadow"
                  />
                </div>
              )}
            </div>
          </div>

          {/* SUBMIT BTN */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition 
              ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-center font-medium mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
