import React from "react";
import { motion } from "framer-motion";

export default function Card({ cardName = "Card Name", length = 0, status }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, delay: 0.3 }}
      className="bg-white p-4 rounded-sm shadow-md text-center"
    >
      <h2 className="text-xl font-semibold mb-2">{cardName}</h2>
      <p className={`text-3xl font-bold text-${status}-600`}>{length}</p>
    </motion.div>
  );
}
