import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs"; // Import star icons
import { RoomContext } from "../../../state/Room";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

const RoomDetialsShow = () => {
  const isLogged = useSelector((state) => state.isLoggedReducer);
  const navigate = useNavigate();
  const [room, setRoom] = useState([]);
  const { getOneRoomDetials } = useContext(RoomContext);
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["oneRoomDetials", id], // userId is part of the query key
    queryFn: () => getOneRoomDetials(id),
  });

  useEffect(() => {
    if (data?.room && data?.status) {
      setRoom(data?.room);
    }
    return () => {
      setRoom([]);
    };
  }, [data]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Handle next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === room?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? room?.images?.length - 1 : prevIndex - 1
    );
  };

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Function to generate star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<BsStarFill key={i} className="text-yellow-400" />);
      } else if (i - 0.5 === rating) {
        stars.push(<BsStarHalf key={i} className="text-yellow-400" />);
      } else {
        stars.push(<BsStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  return !data ? (
    <div>Loadding</div>
  ) : (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 transition duration-300 px-2 mb-6 mt-6"
      >
        <FaArrowLeft className="w-5 h-5 mr-2" />
        <span className="text-lg font-semibold">Back</span>
      </button>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white  overflow-hidden w-full h-full md:flex p-2"
      >
        {/* Image Carousel */}
        <div className="relative w-full md:w-1/2">
          {room?.images && (
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={room?.images[currentImageIndex]}
                alt={room.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-11/12 object-cover rounded-md"
              />
            </AnimatePresence>
          )}

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
          >
            &lt;
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
          >
            &gt;
          </button>

          {/* Thumbnails */}
          <div className="flex space-x-2 pt-2 overflow-x-auto">
            {room?.images?.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(index)}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                  index === currentImageIndex
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                whileHover={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>

        {/* Room Details */}
        <div className="p-4 w-full md:w-1/2 ">
          <h2 className="text-xl font-bold text-start">
            Roon No : {room.roomNumber}
          </h2>
          <div className="float-right">
            Status :
            <b
              style={{
                color:
                  room.status === "available"
                    ? "green"
                    : room.status === "occupied"
                    ? "red"
                    : "yellow",
              }}
            >
              {room.status}
            </b>
          </div>
          <b className="text-gray-600 text-justify block">
            (Room Type : {room.type} , Capacity : {room.capacity})
          </b>
          <p className="text-gray-600 text-justify">{room.description}</p>

          {/* Address */}
          <p className="text-gray-500 text-sm mt-1">📍 {room.location}</p>

          {/* Rating */}
          <div className="flex items-center mt-2">
            {renderStars(room.rating)}
            <span className="ml-2 text-gray-500 text-sm">
              {room.rating} ({room.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-4">
            <span className="text-lg font-semibold">${room.price}</span>
            <span className="text-sm text-gray-500"> / night</span>
          </div>

          {/* Action Buttons */}

          <Link
            to={isLogged?`/booking-room/${room._id}`:"/authentication"}
            state={{
              roomNumber: room.roomNumber,
              capacity: room.capacity,
              roomPrice: room.price,
            }}
            className="mt-4 w-full max-w-40 bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-700 transition duration-300"
          >
            Book Now
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default RoomDetialsShow;
