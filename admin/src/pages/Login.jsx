import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axiosInstance.post('/admin/login', { email, password })
      navigate(result.data.redirectTo)
      console.log(result)
    } catch (error) {
      const data = error.response.data
      if (data?.message) return setErrorMessage(data.message)
      if (data?.errors)return setErrorMessage(data.errors[0].msg)
    }
    // TODO: Call backend API (axios.post('/api/admin/login', { email, password }))
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Admin Login Page
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          {errorMessage ? <p className="text-red-500 text-lg text-center w-full h-max py-2 ">{errorMessage}</p>
            : ''}
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
