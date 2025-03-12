import { motion } from "framer-motion";

const RoomSkeleton = () => {
  return (
    <div className="w-full h-full bg-white p-4 rounded-lg animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="bg-gray-200 px-2 mb-4 rounded shadow w-40 h-8"></div>
        <motion.div
          className="bg-gray-200 min-w-40 max-w-60 h-10 rounded-lg shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>

      {/* Main Image Skeleton */}
      <div className="w-full h-80 bg-gray-200 rounded-lg"></div>

      {/* Thumbnail Skeletons */}
      <div className="flex space-x-2 mt-2 overflow-x-auto">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-16 h-16 bg-gray-200 rounded"></div>
        ))}
      </div>

      {/* Room Details Skeleton */}
      <div className="mt-4 text-center">
        <div className="w-32 h-6 bg-gray-200 mx-auto rounded"></div>
        <div className="w-24 h-5 bg-gray-200 mx-auto mt-2 rounded"></div>
        <div className="w-40 h-5 bg-gray-200 mx-auto mt-2 rounded"></div>
        <div className="w-48 h-5 bg-gray-200 mx-auto mt-2 rounded"></div>
      </div>

      {/* Description Skeleton */}
      <div className="mt-4">
        <div className="w-full h-4 bg-gray-200 rounded"></div>
        <div className="w-3/4 h-4 bg-gray-200 rounded mt-2"></div>
        <div className="w-2/3 h-4 bg-gray-200 rounded mt-2"></div>
      </div>

      {/* Facilities Skeleton */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-center">Facilities:</h3>
        <ul className="list-disc list-inside text-gray-600 text-center">
          {[...Array(3)].map((_, index) => (
            <li key={index} className="w-32 h-4 bg-gray-200 mx-auto mt-2 rounded"></li>
          ))}
        </ul>
      </div>

      {/* Comments Skeleton */}
      <div className="mt-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Comments:</h3>
        {[...Array(2)].map((_, index) => (
          <div key={index} className="mt-2">
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
            <div className="w-48 h-4 bg-gray-200 mt-2 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomSkeleton;
