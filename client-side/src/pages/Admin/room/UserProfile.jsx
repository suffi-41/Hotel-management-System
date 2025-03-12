// UserProfile.js
import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import userImage from "../../../assets/1702497870468.jpg";
const RoomBookingHistory = lazy(() =>
  import("../../../components/RoomBookingHistory")
);

const UserProfile = () => {
  const user = {
    _id: "67892781318e924dafd44ca5",
    name: "Mohd Sufiyan",
    email: "mohdbinsufiyan@gmail.com",
    password: "$2b$10$KzrGMnqR2deE91oiccKAHucUzus3lmEMydiMkbBGr5BLQzFoTm4de",
    phoneNumber: "6307874140",
    gender: "male",
    dateOfBirth: null,
    otp: null,
    isBlocked: false,
    avatar: userImage,
    bookings: [],
    createdAt: "2025-01-16T15:36:33.235+00:00",
    updatedAt: "2025-01-16T15:36:33.235+00:00",
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        className="bg-white shadow-md rounded-lg p-6"
        initial={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <img
            src={userImage} // Assuming avatars are stored in a public folder
            alt={user.name}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="border-b border-gray-300 mb-4"></div>

        <h2 className="text-xl font-semibold mb-2">Profile Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-bold">User ID:</p>
            <p>{user._id}</p>
          </div>
          <div>
            <p className="font-bold">Phone Number:</p>
            <p>{user.phoneNumber}</p>
          </div>
          <div>
            <p className="font-bold">Gender:</p>
            <p>{user.gender}</p>
          </div>
          <div>
            <p className="font-bold">Date of Birth:</p>
            <p>{user.dateOfBirth ? user.dateOfBirth : "N/A"}</p>
          </div>
          <div>
            <p className="font-bold">Is Blocked:</p>
            <p>{user.isBlocked ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="font-bold">Created At:</p>
            <p>{new Date(user.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="font-bold">Updated At:</p>
            <p>{new Date(user.updatedAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Bookings section, if you decide to add it later */}
        {user.bookings.length > 0 ? (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Bookings</h2>
            {/* Render booking details here */}
          </div>
        ) : (
          <p className="mt-4 text-gray-600">No bookings available.</p>
        )}
      </motion.div>
      <Suspense fallback={<div>Lodding...</div>}>
        <RoomBookingHistory />
      </Suspense>
    </div>
  );
};

export default UserProfile;
