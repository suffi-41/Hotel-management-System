import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import UserAvature from "./UserAvature";
import { FaRegHeart } from "react-icons/fa";
import { MdHome, MdContactSupport } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

function useScrollLength() {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // Distance scrolled from the top
      setScrollPosition(scrollTop);
    };
    window.addEventListener("scroll", handleScroll);
    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPosition;
}

const Navbar = () => {
  const isLogged = useSelector((state) => state.isLoggedReducer);
  const [isOpen, setIsOpen] = useState(false);
  const scrollPosition = useScrollLength();

  console.log(scrollPosition);
  return (
    <motion.nav
      className={` ${
        scrollPosition <= 30 ? "bg-transparent" : " bg-black"
      } z-100 transition-all duration-1000 shadow-lg fixed top-0  w-screen z-50
    h-16`}
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-white whitespace-nowrap">
            <Link href="/">Hotel Management</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 justify-center items-center">
            <Link to="/" className="text-white hover:text-yellow-300">
              Home
            </Link>
            <Link to="/rooms" className="text-white hover:text-yellow-300">
              Rooms
            </Link>
            <Link to="/Facilities" className="text-white hover:text-yellow-300">
              Facilities
            </Link>
            <Link to="/booking" className="text-white hover:text-yellow-300">
              Booking
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-yellow-300 whitespace-nowrap"
            >
              Contact Us
            </Link>
            {isLogged ? (
              <UserAvature />
            ) : (
              <Link
                to="/authentication"
                className="text-white hover:text-yellow-300"
              >
                Login
              </Link>
            )}
          </div>
          {/* Mobile Menu top items */}
          <div className="md:hidden flex justify-around itmes-center gap-3">
            <Link
              to="/authentication"
              className="text-white hover:text-yellow-300"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-full h-full"
              >
                <FaRegHeart className="w-full h-full text-3xl" />
              </motion.div>
            </Link>
            {isLogged ? (
              <UserAvature />
            ) : (
              <Link
                to="/authentication"
                className="text-white hover:text-yellow-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu bottom items */}

        <div className="md:hidden fixed flex bottom-0 left-0 backdrop-blur-md w-full justify-between p-2">
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
      </div>
    </motion.nav>
  );
};

export default Navbar;
