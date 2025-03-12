// StaffDashboard.jsx
import React, { Children } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdHome, MdContactSupport } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const StaffDashboard = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex md:flex-row flex-col">
      {/* Sidebar */}
      <aside className="hidden w-64 bg-gray-800 text-white md:flex flex-col p-4 space-y-6">
        <h2 className="text-2xl font-semibold">Staff Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li className="hover:bg-gray-700 p-2 rounded">
              <Link to="tasks">Assigned Tasks</Link>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded">
              <Link to="rooms">Room Status</Link>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded">
              <Link to="notifications">Notifications</Link>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded">
              <Link to="profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <header className="md:hidden w-full sticky top-0 bg-gray-200 shadow-md h-auto">
        <nav className="w-full p-3 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Staff Dashboard</h2>
          <span className="hover:bg-gray-700 p-2 rounded">
            <Link to="profile">Profile</Link>
          </span>
        </nav>
      </header>
      <div className="md:hidden fixed flex bottom-0 left-0 bg-gray-800 backdrop-blur-md w-full justify-between p-2">
        <Link href="#home" className="block py-2 px-4 text-white ">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full h-full"
          >
            <MdHome className="w-full h-full text-3xl" />
          </motion.div>
        </Link>
        <Link href="#rooms" className="block py-2 px-4 text-white ">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full h-full"
          >
            <IoMdAddCircle className="w-full h-full text-3xl" />
          </motion.div>
        </Link>
        <Link href="#facilities" className="block py-2 px-4 text-white ">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full h-full"
          >
            <MdContactSupport className="w-full h-full text-3xl" />
          </motion.div>
        </Link>
        <Link href="#booking" className="block py-2 px-4 text-white ">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full h-full"
          >
            <MdContactSupport className="w-full h-full text-3xl" />
          </motion.div>
        </Link>
        <Link href="#contact" className="block py-2 px-4 text-white ">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full h-full"
          >
            <MdContactSupport className="w-full h-full text-3xl" />
          </motion.div>
        </Link>
      </div>

      {children}
    </div>
  );
};

export default StaffDashboard;
