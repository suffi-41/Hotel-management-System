import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function UserAvature({
  imagesUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYVrSjeBHxORVIiBJw9p7-t5NJ7IZSQuUsWA&s",
}) {
  return (
    <motion.div
      className="w-10 h-10 rounded-full bg-transparent flex justify-center items-center rounded-full"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Link to="/" className="w-full h-full object-cover">
        <img
          src={imagesUrl}
          alt="user"
          className="w-full h-full object-cover bg-center bg-transparent rounded-full"
        />
      </Link>
    </motion.div>
  );
}
