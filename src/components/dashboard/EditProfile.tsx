import React, { useState, useEffect } from "react";
import { Camera, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ProfileForm = {
  name: string;
  email: string;
  phone: string;
  bio: string;
  profilePic: string;
};

export default function EditProfile() {
  const navigate = useNavigate();

  // Load initial data from localStorage or defaults
  const storedProfile = localStorage.getItem("userProfile");
  const initialProfile: ProfileForm = storedProfile
    ? JSON.parse(storedProfile)
    : {
        name: "",
        email: "",
        phone: "",
        bio: "",
        profilePic: "/default-avatar.jpg",
      };

  const [form, setForm] = useState<ProfileForm>(initialProfile);

  // Update profile picture preview on file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  // Handle input and textarea changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save profile to localStorage and navigate back
  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(form));
    alert("Profile updated successfully!");
    navigate("/profile");
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(135deg, #000000 0%, #222222 100%)",
        color: "white",
      }}
    >
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-3 p-2 hover:bg-gray-800 rounded-full transition"
          aria-label="Go Back"
        >
          <ArrowLeft size={24} color="white" />
        </button>
        <h2 className="text-xl font-semibold">Edit Profile</h2>
      </div>

      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative group">
          <img
            src={form.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 shadow-md"
          />
          <label
            htmlFor="upload-photo"
            className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer shadow-lg group-hover:scale-110 transition transform"
          >
            <Camera size={18} color="#fff" />
          </label>
          <input
            type="file"
            id="upload-photo"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            autoComplete="name"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-300">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
            autoComplete="tel"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-300">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write something about yourself..."
            rows={3}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white p-3 rounded-xl font-semibold shadow-md transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
