import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

const Security = () => {
  const [form, setForm] = useState({
    oldEmail: "",
    oldPassword: "",
    newEmail: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/admin/update", form);
      alert(res.data.message);
      setForm({
        oldEmail: "",
        oldPassword: "",
        newEmail: "",
        newPassword: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Navbar />
      <div className="w-full flex items-center justify-center min-h-screen md:w-[calc(100%-256px)] absolute top-[10vh] md:top-0 right-0 ">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl text-sm  md:text-xl lg:text-2xl  max-w-md shadow flex flex-col items-center justify-center gap-3 min-w-max"
        >
        <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>

          <input
            type="email"
            name="oldEmail"
            placeholder="Current Email"
            value={form.oldEmail}
            onChange={handleChange}
            required
            className="border-2 border-zinc-900 px-3 py-2 text-center shadow-sm shadow-black/20 mt-3 min-w-50 sm:min-w-90 lg:min-w-125 rounded-4xl outline-none"
            
          />

          <input
            type="password"
            name="oldPassword"
            placeholder="Current Password"
            value={form.oldPassword}
            onChange={handleChange}
            required
            className="border-2 border-zinc-900 px-3 py-2 text-center shadow-sm shadow-black/20 mt-3 min-w-50 sm:min-w-90 lg:min-w-125 rounded-4xl outline-none"
            
          />

          <input
            type="email"
            name="newEmail"
            placeholder="New Email"
            value={form.newEmail}
            onChange={handleChange}
            className="border-2 border-zinc-900 px-3 py-2 text-center shadow-sm shadow-black/20 mt-3 min-w-50 sm:min-w-90 lg:min-w-125 rounded-4xl outline-none"
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            required
            className="border-2 border-zinc-900 px-3 py-2 text-center shadow-sm shadow-black/20 mt-3 min-w-50 sm:min-w-90 lg:min-w-125 rounded-4xl outline-none"
          />

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-black text-white py-2  mt-4"
          >
            {loading ? "Updating..." : "Update Security"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Security;
