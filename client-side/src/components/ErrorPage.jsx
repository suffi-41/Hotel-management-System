import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const textVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.9 },
  };

  return (
    <motion.div
      className="flex flex-col fixed top-0 left-0 items-center justify-center h-screen w-screen bg-gradient-to-br from-purple-500 to-indigo-600 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-6xl font-bold mb-4" variants={textVariants}>
        404
      </motion.h1>
      <motion.p className="text-2xl mb-8" variants={textVariants}>
        Oops! The data you're looking for is undefined.
      </motion.p>
      <motion.button
        className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => navigate(-1)}
      >
        Go Back
      </motion.button>
    </motion.div>
  );
};

export default ErrorPage;
