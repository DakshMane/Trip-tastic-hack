import React, { useState } from "react";
import { Camera, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("/default-avatar.jpg");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Profile updated successfully!");
    // TODO: API call to save profile
    navigate("/profile"); // Go back to profile after saving
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-3 p-2 hover:bg-gray-200 rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-semibold">Edit Profile</h2>
      </div>

      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative group">
          <img
            src={profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
          <label
            htmlFor="upload-photo"
            className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer shadow-lg group-hover:scale-110 transition"
          >
            <Camera size={18} color="#fff" />
          </label>
          <input
            type="file"
            id="upload-photo"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            placeholder="Write something about yourself..."
            rows={3}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl font-medium shadow-md transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}