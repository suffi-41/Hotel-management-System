import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaHotel, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RoomContext } from "../state/Room";
import { toast } from "react-toastify";

const BookingDetails = () => {
  const [booking, setBooking] = useState({});
  const { id } = useParams();
  const { getBookingDetialsById } = useContext(RoomContext);

  // Fixed typo in queryKey ("bookingDetails")
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["bookingDetails", id],
    queryFn: () => getBookingDetialsById(id),
  });

  useEffect(() => {
    if (data?.status) {
      setBooking(data.booking);
    } else if (data?.message) {
      toast.error(data.message);
    }
  }, [data]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-8 px-4 sm:px-6 lg:px-8"
    >
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="bg-blue-400 p-4 shadow-md rounded-lg flex justify-between mb-4"
      >
        <h1 className="text-2xl font-bold text-center text-white">
          Booking Details
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
          className="bg-white/80 backdrop-blur-sm px-2 rounded-xl shadow-sm border border-white/20 hover:shadow-md transition-all"
        >
          Go Back
        </motion.button>
      </motion.div>

      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-2">
        {/* Guest Information */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 hover:shadow-md transition-all"
        >
          <div className="flex items-center mb-4">
            <FaUser className="text-2xl text-blue-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-700">
              Guest Information
            </h2>
          </div>
          <div className="space-y-3 pl-10">
            <p className="text-gray-600 text-start">
              <span className="font-medium">Name:</span>{" "}
              {booking?.guestName || "N/A"}
            </p>
            <p className="text-gray-600 text-start">
              <span className="font-medium">Email:</span>{" "}
              {booking?.guestEmail || "N/A"}
            </p>
            <p className="text-gray-600 text-start">
              <span className="font-medium">Phone:</span>{" "}
              {booking?.guestPhone || "N/A"}
            </p>
          </div>
        </motion.div>

        {/* Room Information - Fixed object rendering */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 hover:shadow-md transition-all"
        >
          <div className="flex items-center mb-4">
            <FaHotel className="text-2xl text-purple-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-700">
              Room Information
            </h2>
          </div>
          <div className="space-y-3 pl-10">
            <p className="text-gray-600 text-start">
              <span className="font-medium ">Room Number:</span>{" "}
              {booking?.roomId?.roomNumber || "N/A"}
            </p>
            <p className="text-gray-600 text-start">
              <span className="font-medium">Room Type:</span>{" "}
              {/* Fixed label */}
              {booking?.roomId?.type || "N/A"}
            </p>
            <p className="text-gray-600 text-start">
              <span className="font-medium">Guests:</span>{" "}
              {booking?.numberOfGuests || "N/A"}
            </p>
          </div>
        </motion.div>

        {/* Booking Dates - Added null checks */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 hover:shadow-md transition-all"
        >
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="text-2xl text-green-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-700">
              Booking Dates
            </h2>
          </div>
          <div className="space-y-3 pl-10">
            <p className="text-gray-600 text-start">
              <span className="font-medium">Check-In:</span>
              {booking?.checkInDate
                ? new Date(booking.checkInDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="text-gray-600 text-start">
              <span className="font-medium">Check-Out:</span>
              {booking?.checkOutDate
                ? new Date(booking.checkOutDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="text-gray-600 text-start">
              <span className="font-medium">Booked At:</span>
              {booking?.createdAt
                ? new Date(booking.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </motion.div>

        {/* Pricing and Status */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 hover:shadow-md transition-all"
        >
          <div className="flex items-center mb-4">
            <FaDollarSign className="text-2xl text-yellow-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-700">
              Pricing & Status
            </h2>
          </div>
          <div className="space-y-3 pl-10 text-start">
            <p className="text-gray-600">
              <span className="font-medium">Total:</span> $
              {booking?.totalPrice?.toFixed(2) || "0.00"}
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <span className="font-medium">Status:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold text-start ${
                  booking?.status === "Booked"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {booking?.status || "Unknown"}
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BookingDetails;
