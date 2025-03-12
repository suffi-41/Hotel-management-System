import React from "react";
import { motion } from "framer-motion";
import { FaTrash, FaTimes } from "react-icons/fa";
const DeleteModal = ({
  onClose,
  onConfirm,
  id,
  content = "delete/InActive this Room/Staff",
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Confirm </h2>
          <button
            onClick={() => {
              onClose(false);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Body */}
        <p className="text-gray-600 mb-6">
          {`Are you sure you want to ${content} ? This action
          cannot be undone.`}
        </p>

        {/* Footer */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              onClose(false);
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onConfirm(id);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <FaTrash className="inline mr-2" /> Confirm
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteModal;
