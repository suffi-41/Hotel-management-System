import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom"; // For routing

//redux
import { actionCreator } from "../../../../redux/index";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";

const SideNavbar = () => {
  const Navigation = useNavigate();
  const dispatch = useDispatch();
  const action = bindActionCreators(actionCreator, dispatch);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navItems = [
    { name: "Profile", path: "profile", icon: "👤" },
    { name: "Bookings", path: "bookings", icon: "📅" },
  ];

  const logOut = async () => {
    localStorage.clear();
    action.logout();
    toast.error("Logout Successfully");
    Navigation("/authentication");
  };

  return (
    <motion.aside
      initial={{ width: isCollapsed ? 80 : 250 }}
      animate={{ width: isCollapsed ? 80 : 250 }}
      transition={{ duration: 0.3 }}
      className="hidden md:flex bg-white text-gray-800 sm:min-h-[calc(100vh-4rem)]  flex-col p-4  border-r border-gray-200 shadow-sm  md:w-auto min-w-screen bg-blue-300"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mb-4 p-2 bg-gray-100 rounded hover:bg-gray-200 text-gray-600 "
      >
        {isCollapsed ? "➡️" : "⬅️"}
      </button>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2 ">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded hover:bg-gray-100 transition-colors ${
                  location.pathname === item.path
                    ? "bg-gray-100 font-semibold"
                    : ""
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && <span className="ml-2">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}

      <div className="mt-4 cursor-pointer" onClick={logOut}>
        <span
          className={`flex items-center p-2 rounded hover:bg-red-300 transition-colors
                `}
        >
          <span className="text-xl">{"🔒"}</span>
          {!isCollapsed && <span className="ml-2">{"Logout"}</span>}
        </span>
      </div>
    </motion.aside>
  );
};

export default SideNavbar;
