import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdHome, MdContactSupport } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

import {
  FaHistory,
  FaMoneyCheckAlt,
  FaCalendarAlt,
  FaHome,
  FaUsers,
  FaHotel,
  FaMoneyBill,
  FaChartLine,
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

import { IoNotificationsCircleSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { useLocation } from "react-router-dom";

import Navbar from "../pages/Admin/authentication/conponent/Navbar";
import Footer from "../pages/Admin/authentication/conponent/Footer";

//redux

import { useSelector } from "react-redux";

const AdminDashboard = ({ children }) => {
  const navigate = useNavigate();
  const { isAdminLogged } = useSelector((state) => state.isLoggedReducer);
  // useEffect(() => {
  //   isAdminLogged ? isAdminLogged && navigate("/admin") : navigate("/admin/login");
  // }, []);
  const location = useLocation();
  const { pathname } = location;

  return !isAdminLogged ? (
    <div className="h-screen w-screen  bg-gray-100 flex  flex-col justify-between items-center">
      <Navbar />
      {(pathname === "/admin/login" || pathname === "/admin/password-verify") &&
        children}
      <Footer />
    </div>
  ) : (
    isAdminLogged && (
      <div className="min-h-screen  bg-gray-100 flex md:flex-row flex-col">
        {/* Sidebar */}
        <aside className="hidden w-68 bg-blue-600 text-white md:flex flex-col px-4 space-y-6 h-screen overflow-auto">
          <h1 className=" px-4 text-start text-2xl font-bold sticky top-0 mt-10 bg-blue-600 ">
            Admin Dashboard
          </h1>
          <nav className="flex flex-col justify-between h-screen">
            <ul className="space-y-4">
              <li className="mb-4">
                <Link
                  to="/admin"
                  className="flex items-center hover:bg-blue-700 p-2 rounded"
                >
                  <FaHome className="mr-2" /> Dashboard
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/admin/dashboard/rooms"
                  className="flex items-center hover:bg-blue-700 p-2 rounded"
                >
                  <FaHotel className="mr-2" /> Rooms
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/admin/dashboard/users"
                  className="flex items-center hover:bg-blue-700 p-2 rounded"
                >
                  <FaUsers className="mr-2" /> Guests
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/billing"
                  className="flex items-center hover:bg-blue-700 p-2 rounded"
                >
                  <FaMoneyBill className="mr-2" /> Billing
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/admin/dashboard/report"
                  className="flex items-center hover:bg-blue-700 p-2 rounded"
                >
                  <FaChartLine className="mr-2" /> Reports
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/admin/dashboard/room-booking-history"
                  className="flex items-center hover:bg-blue-700 p-2 rounded"
                >
                  <FaHistory className="mr-2" /> Booking History
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/admin/dashboard/notification"
                  className="flex items-center hover:bg-blue-700 p-2 rounded"
                >
                  <IoNotificationsCircleSharp className="mr-2 text-xl" />{" "}
                  Notification
                </Link>
              </li>
            </ul>
            <ul>
              <li className="mb-4">
                <Link
                  to="/admin/profile"
                  className="flex items-center hover:bg-blue-700 p-2 rounded"
                >
                  <FaChartLine className="mr-2" /> Profile
                </Link>
              </li>
              <li className="mb-4">
                <button
                  to="/admin/dashboard/room-booking-history"
                  className="flex items-center hover:bg-red-500 p-2 rounded w-full "
                >
                  <IoMdLogOut className="mr-2 text-xl " /> Logout
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="md:hidden fixed flex bottom-0 left-0 bg-gray-800 backdrop-blur-md w-full justify-between p-2 ">
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
        <main className="flex-1 w-full max-h-screen overflow-auto z-100">
          {/* <header className="flex items-center justify-between p-4 bg-white shadow-lg text-white sticky top-0 ">
           
            <div className="md:hidden text-xl font-semibold">
              Admin Dashboard
            </div>

            
            <div className="hidden md:block"></div>

          
            <div className="hidden sm:flex items-center bg-gray-700 rounded-lg p-1 w-1/3">
              <FaSearch className="text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-white ml-2 w-full"
              />
            </div>

            <div className="flex items-center space-x-4">
           
              <button className="relative p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                <FaBell />
                <span className="absolute top-0 right-0 bg-red-500 rounded-full h-2 w-2"></span>
              </button>

              <div className="relative group">
                <button className="flex items-center p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                  <FaUserCircle className="text-2xl" />
                </button>

            
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg hidden group-hover:block">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Settings
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </header> */}

          <div className="md:p-8 p-2 max-h-screen">
            {!(
              pathname === "/admin/login" ||
              pathname === "admin/password-verify"
            ) && children}
          </div>
        </main>
      </div>
    )
  );
};

export default AdminDashboard;
