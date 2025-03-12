import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RiArrowDownSFill } from "react-icons/ri";

export default function NavComponets({
  title = "Title name",
  pathWithnameArr = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-auto w-full transition-all duration-500 ease-in-out">
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer flex justify-between items-center  gap-1 hover:bg-gray-700 p-2 rounded"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span>{title}</span>
        <RiArrowDownSFill className={isOpen ? "rotate-180" : "rotate-0"} />
      </motion.div>
      {isOpen && (
        <div className="flex flex-col justify-center items-start  gap-1 p-2">
          {pathWithnameArr?.map((item, index) => {
            return (
              <Link
                to={item.path}
                className="block py-2 px-6 w-full text-left  hover:bg-gray-700 p-2 rounded "
                key={index}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-full h-full"
                >
                  {item.name}
                </motion.div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
