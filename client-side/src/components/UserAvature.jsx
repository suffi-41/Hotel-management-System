import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function UserAvature({ imagesUrl }) {
  return (
    <motion.div
      className="w-10 h-10 rounded-full bg-transparent flex justify-center items-center rounded-full"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Link to="/user-dashboard/profile" className="w-full h-full object-cover">
        <img
          src={
            imagesUrl ||
            "https://th.bing.com/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?w=193&h=192&c=7&r=0&o=5&dpr=1.1&pid=1.7"
          }
          alt="user"
          className="w-full h-full object-cover bg-center bg-transparent rounded-full"
        />
      </Link>
    </motion.div>
  );
}
