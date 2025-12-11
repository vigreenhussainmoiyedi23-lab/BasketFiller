import React, { useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      setLoading(true);
      const res = await axiosInstance.post("/user/contactus", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage(res.data.message);
      setFormData({ title: "", description: "", phone: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-black via-black/95 to-black text-white overflow-x-hidden">
      <Navbar />

      {/* Glass form container */}
      <div className="flex justify-center items-center pt-28 pb-16 px-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-full max-w-xl shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <h1 className="text-3xl font-semibold text-center text-purple-300 mb-6">
            Contact Us
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your query title"
                className="w-full px-4 py-2 rounded-lg bg-black/40 text-gray-100 border border-white/20 focus:border-purple-400 outline-none transition-all duration-200"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your query..."
                rows="4"
                className="w-full px-4 py-2 rounded-lg bg-black/40 text-gray-100 border border-white/20 focus:border-purple-400 outline-none transition-all duration-200 resize-none"
              ></textarea>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 rounded-lg bg-black/40 text-gray-100 border border-white/20 focus:border-purple-400 outline-none transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-all duration-200 shadow-md disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Send Message"}
            </button>

            {message && (
              <p className="text-green-400 text-center font-medium mt-2">
                ✅ {message}
              </p>
            )}
            {error && (
              <p className="text-red-400 text-center font-medium mt-2">
                ⚠️ {error}
              </p>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
