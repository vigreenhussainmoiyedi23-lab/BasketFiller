import React from "react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import UserCard from "../../components/Users/UserCard";
import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import { useEffect } from "react";

const Users = () => {
  const [filter, setFilter] = useState("all");
  const [userStatusChanged, setUserStatusChanged] = useState(0);
  const [users, setUsers] = useState(null);
  const GetAllUsers = async () => {
    try {
      const { data } = await axiosInstance.post("/admin/all", { filter });
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };
  async function banHandler({ id }) {
    try {
      await axiosInstance.post(`/admin/user/ban/${id}`);
      setUserStatusChanged((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  }
  async function unBanHandler({ id }) {
    try {
      await axiosInstance.post(`/admin/user/unban/${id}`);
      setUserStatusChanged((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    GetAllUsers();
  }, [userStatusChanged, filter]);

  if (!users) {
    return <>Loading user</>;
  }
  return (
    <div className="relative">
      <Navbar />
      <Sidebar />
      <div className="w-screen absolute  top-[10vh] px-5 py-3  md:top-0 right-0 md:w-[calc(100vw-256px)] min-h-screen">
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl text-sky-500">All Users</h1>
          <select
            name="filter"
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="sm:w-40 w-20 px-3 mb-5 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400 transition-all duration-200"
          >
            <option value="all">All</option>
            <option value="banned">Banned</option>
            <option value="unbanned">Unbanned</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {users.length == 0 && <>No users found</>}
          {users.map((user) => {
            return (
              <UserCard
                user={user}
                banHandler={banHandler}
                unBanHandler={unBanHandler}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Users;
