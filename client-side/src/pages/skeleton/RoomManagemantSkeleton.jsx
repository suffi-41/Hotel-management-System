import React from "react";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "./TableSkeleton";


export default function RoomManagementSkeleton() {
  return (
    <div className="p-4 z-10">
      {/* Overview Cards Skeleton */}
      <section
        id="overview"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5"
      >
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-lg h-20 flex flex-col justify-between"
            >
              <Skeleton width="60%" height="16px" />
              <Skeleton width="40%" height="24px" />
            </div>
          ))}
      </section>

      {/* Filter Skeleton */}
      <div className="flex items-center mb-4 bg-white px-4 py-2 rounded-lg shadow-md max-w-72">
        <Skeleton width="20px" height="20px" className="mr-2" circle={true} />
        <Skeleton width="80px" height="16px" />
        <Skeleton
          width="120px"
          height="32px"
          className="ml-4"
          style={{ borderRadius: "8px" }}
        />
      </div>
        {/* Table Skeleton */}

     <TableSkeleton/>
    </div>
  );
}
