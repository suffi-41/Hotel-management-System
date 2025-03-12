import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdHome, MdContactSupport  } from 'react-icons/md';
import { IoMdAddCircle } from 'react-icons/io';

const AdminDashboard = ({children}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex md:flex-row flex-col">
      {/* Sidebar */}
      <aside className="hidden w-64 bg-gray-800 text-white md:flex flex-col p-4 space-y-6">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li className="hover:bg-gray-700 p-2 rounded">
              <a href="#overview">Overview</a>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded">
              <a href="#rooms">Room Management</a>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded">
              <a href="#staff">Staff Management</a>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded">
              <a href="#bookings">Bookings</a>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded">
              <a href="#feedback">Customer Feedback</a>
            </li>
          </ul>
        </nav>
      </aside>
      <header className="md:hidden w-full sticky top-0 bg-gray-200 shadow-md h-auto">
        <nav className="w-full p-3 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
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
      
      <main className="flex-1 p-8 space-y-6">
        <section id="overview" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-gray-700">Total Rooms</h3>
            <p className="text-2xl">120</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-gray-700">Occupied Rooms</h3>
            <p className="text-2xl">85</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-gray-700">Available Rooms</h3>
            <p className="text-2xl">35</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-gray-700">Staff On Duty</h3>
            <p className="text-2xl">20</p>
          </div>
        </section>
        {children}
       

      
        

     
       

        
      
      </main>
    </div>
  );
};

export default AdminDashboard;
