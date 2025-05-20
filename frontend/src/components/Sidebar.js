import React from "react";
import { NavLink } from "react-router-dom";

const img =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gray-800 text-white transition-all duration-300 ease-in-out flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between">
        {isOpen ? (
          <h2 className="text-xl font-semibold">Inventory</h2>
        ) : (
          <h2 className="text-xl font-semibold">WLS</h2>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-gray-700 focus:outline-none"
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>
      </div>

      <nav className="flex-1 mt-6">
        <SidebarItem icon="📊" title="Dashboard" isOpen={isOpen} to="/" />
        <SidebarItem
          icon="🍷"
          title="Inventory"
          isOpen={isOpen}
          to="/inventory"
        />
        <SidebarItem
          icon="💾"
          title="Database"
          isOpen={isOpen}
          to="/database"
        />
        <SidebarItem
          icon="📦"
          title="Suppliers"
          isOpen={isOpen}
          to="/suppliers"
        />
        <SidebarItem icon="📝" title="Orders" isOpen={isOpen} to="/orders" />
        <SidebarItem
          icon="⚙️"
          title="Settings"
          isOpen={isOpen}
          to="/settings"
        />
      </nav>

      <div className="p-4 border-t border-gray-700">
        {isOpen ? (
          <div className="flex items-center space-x-2">
            <img
              className="h-8 w-8 rounded-full"
              src={img}
              alt="User profile"
            />
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@example.com</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <img
              className="h-8 w-8 rounded-full"
              src={img}
              alt="User profile"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, title, isOpen, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-3 flex items-center space-x-3 ${
          isActive ? "bg-gray-900" : "hover:bg-gray-700"
        } cursor-pointer`
      }
    >
      <span className="text-xl">{icon}</span>
      {isOpen && <span>{title}</span>}
    </NavLink>
  );
};

export default Sidebar;
