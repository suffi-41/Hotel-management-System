import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { FaPrint, FaEdit, FaTimes } from "react-icons/fa";

const BookingDetailsPage = () => {
  const { state } = useLocation();

  const bookingDetails = {
    bookingId: "123456",
    hotelName: "Luxury Hotel",
    roomType: "Deluxe Room",
    checkInDate: "2023-10-15",
    checkOutDate: "2023-10-20",
    totalPrice: 500,
    guestName: "John Doe",
    guestEmail: "john.doe@example.com",
    status: "Confirmed",
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full h-full flex items-center justify-center md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white md:rounded-lg md:shadow-lg p-8 w-full max-w-2xl border md:border-gray-300"
      >
        <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
          Booking Details
        </h3>
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2  p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            <FaPrint />
          </button>
          <button className="flex items-center space-x-2  p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300">
            <FaEdit />
          </button>
          <button className="flex items-center space-x-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-6 text-gray-800">
          {Object.entries(bookingDetails).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b pb-2">
              <span className="text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, " $1")}:
              </span>
              <span
                className={`font-semibold ${
                  key === "totalPrice" ? "text-blue-600 text-xl" : ""
                } ${
                  key === "status" && bookingDetails.status === "Confirmed"
                    ? "text-green-600"
                    : ""
                }`}
              >
                {key === "totalPrice" ? `$${value}` : value}
              </span>
            </div>
          ))}
        </div>

     
      </motion.div>
    </div>
  );
};

export default BookingDetailsPage;
