import React from "react";

export default function BookingDetialsCard({ booking}) {
  return (
    <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between">
        <span className="text-gray-600">Hotel Name:</span>
        <span className="text-gray-800 font-semibold">{booking.hotelName}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Room Type:</span>
        <span className="text-gray-800 font-semibold">{booking.roomType}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Check-In Date:</span>
        <span className="text-gray-800 font-semibold">
          {booking.checkInDate}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Check-Out Date:</span>
        <span className="text-gray-800 font-semibold">
          {booking.checkOutDate}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Status:</span>
        <span
          className={`font-semibold ${
            booking.status === "Confirmed" ? "text-green-600" : "text-blue-600"
          }`}
        >
          {booking.status}
        </span>
      </div>
    </div>
  );
}
