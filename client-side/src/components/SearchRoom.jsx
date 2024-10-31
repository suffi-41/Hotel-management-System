import React from "react";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";

export default function SearchRoom() {
  return (
    <motion.div
      className="z-50 sm:w-1/2 w-9/12  p-5 bg-transparent text-white flex flex-col justifuy-center items-center gap-2"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className=" w-full text-4xl h-20 md:h-auto md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-4">
        <ReactTyped
          strings={["A Luxery Stay", "A Deluxe Stay", "A Business Stay"]}
          typeSpeed={40}
          backSpeed={50}
          loop
        />
      </h1>
      <div className="flex justify-center items-center gap-2 w-full flex-wrap lg:flex-nowrap  ">
        <input
          type="text"
          placeholder="Check-in Date"
          className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm   "
        />
        <input
          type="text"
          placeholder="Check-in Date"
          className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm  "
        />
        <input
          type="text"
          placeholder="Check-in Date"
          className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40 backdrop-blur-sm  "
        />
        <input
          type="text"
          placeholder="Check-in Date"
          className="w-full p-4 border-2 border-gray-300 bg-transparent placeholder-white  outline-none flex-grow md:w-40  backdrop-blur-sm "
        />
        <motion.button
          whileHover={{ scale: 0.9 }}
          type="submit"
          className="w-full whitespace-nowrap w-full p-4 border-2 border-gray-300 bg-green-500 placeholder-white  outline-none flex-grow md:w-40 hover:bg-transparent backdrop-blur-sm "
        >
          Search Now
        </motion.button>
      </div>
    </motion.div>
  );
}
