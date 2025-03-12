import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom"; // For routing
import { IoArrowBackCircleSharp } from "react-icons/io5";

// Redux
import { actionCreator } from "../../../../redux/index";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";

const BottomNavbar = () => {
  const Navigation = useNavigate();
  const dispatch = useDispatch();
  const action = bindActionCreators(actionCreator, dispatch);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Navigation items
  const navItems = [
    { name: "Back", path: "/", icon: <IoArrowBackCircleSharp /> },
    { name: "Bookings", path: "bookings", icon: "📅" },
    { name: "Profile", path: "profile", icon: "👤" },
  ];

  // Logout function
  const logOut = async () => {
    localStorage.clear();
    action.logout();
    toast.error("Logout Successfully");
    Navigation("/authentication");
  };

  return (
    <motion.nav
      initial={{ y: 100 }} // Start off-screen
      animate={{ y: 0 }} // Slide up into view
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 bg-white text-gray-800 flex justify-around items-center p-2 border-t border-gray-200 shadow-lg md:hidden"
    >
      {/* Navigation Links */}
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex flex-col items-center p-2 rounded hover:bg-gray-100 transition-colors ${
            location.pathname === item.path ? "bg-gray-100 font-semibold" : ""
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          {!isCollapsed && <span className="text-xs mt-1">{item.name}</span>}
        </Link>
      ))}

      {/* Logout Button */}
      <div
        onClick={logOut}
        className="flex flex-col items-center p-2 rounded hover:bg-red-300 transition-colors cursor-pointer"
      >
        <span className="text-xl">{"🔒"}</span>
        {!isCollapsed && <span className="text-xs mt-1">{"Logout"}</span>}
      </div>
    </motion.nav>
  );
};

export default BottomNavbar;
