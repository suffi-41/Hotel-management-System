import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'

function useScrollLength() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // Distance scrolled from the top
      setScrollPosition(scrollTop);
    };
    window.addEventListener('scroll', handleScroll);
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollPosition = useScrollLength();
  

  return (
    <motion.nav
     className={` ${scrollPosition<=45?"bg-transparent":" bg-black"} transition-all duration-1000 shadow-lg fixed top-0  w-screen z-50
    h-16`}
     initial={{opacity:0, y:-80}}
     animate={{opacity:1, y:0}}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-white whitespace-nowrap">
            <a href="/">Hotel Management</a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-20 justify-center items-center">
            <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
            <Link to="/rooms" className="text-white hover:text-yellow-300">Rooms</Link>
            <Link to="/Facilities" className="text-white hover:text-yellow-300">Facilities</Link>
            <Link to="/booking" className="text-white hover:text-yellow-300">Booking</Link>
            <Link to="/contact" className="text-white hover:text-yellow-300 whitespace-nowrap">Contact Us</Link>
            <Link to="/authentication" className="text-white hover:text-yellow-300">Login/Singup</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <a href="#home" className="block py-2 px-4 text-white hover:bg-blue-500">Home</a>
            <a href="#rooms" className="block py-2 px-4 text-white hover:bg-blue-500">Rooms</a>
            <a href="#facilities" className="block py-2 px-4 text-white hover:bg-blue-500">Facilities</a>
            <a href="#booking" className="block py-2 px-4 text-white hover:bg-blue-500">Booking</a>
            <a href="#contact" className="block py-2 px-4 text-white hover:bg-blue-500">Contact Us</a>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
