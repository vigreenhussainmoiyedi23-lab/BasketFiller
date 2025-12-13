import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, Users, Shield } from "lucide-react";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Orders", path: "/orders", icon: <ShoppingBag size={20} /> },
    { name: "Products", path: "/products", icon: <Package size={20} /> },
    { name: "Users", path: "/users", icon: <Users size={20} /> },
    { name: "Security", path: "/security", icon: <Shield size={20} /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 p-6">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800">Admin Panel</h2>

      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all ${
                isActive ? "bg-blue-100 text-blue-700 font-medium" : ""
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
