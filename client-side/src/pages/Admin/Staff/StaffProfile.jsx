import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DetailRow from "./component/DetailRow";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../../state/User";
import { toast } from "react-toastify";

import {
  FaMoneyBillAlt,
  FaCalendarAlt,
  FaHistory,
  FaArrowLeft,
} from "react-icons/fa"; // Icons from React Icons

const StaffProfile = () => {
  //navigate
  const navigate = useNavigate();
  //state
  const [staffDetails, setStaffDetails] = useState([]);
  const { id } = useParams();
  //context
  const { getOneEmployeeDetails } = useContext(UserContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ["staffDetails", id],
    queryFn: () => getOneEmployeeDetails(id),
  });
  useEffect(() => {
    if (data?.employee && data?.status) {
      setStaffDetails(data.employee);
    } else {
      toast.error(data?.message);
    }
  }, [data]);
  // date fomating in day , month and year , hour , minute and second
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  };

  return (
    !isLoading && (
      <div className="flex items-center justify-center w-full ">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden w-full p-6 "
        >
          <div className="flex flex-col  justify-center  items-start  ">
            <nav className="w-full p-2">
              <div className="container mx-auto flex sm:flex-row flex-col-reverse gap-4 justify-between items-center">
                {/* Logo or Brand Name */}
                <div className="flex-shrink-0 flex  items-start justify-start gap-2 px-4">
                  <img
                    src={
                      "https://th.bing.com/th/id/OIP.4j4jNaPU3bIzDJHBj6HDSwHaHa?w=194&h=194&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                    }
                    alt="Profile"
                    className="md:w-24 md:h-24 h-16 w-16 rounded-full border-2 border-blue-500 "
                  />
                  <div className="flex flex-col justify-center items-start md:mt-4">
                    <h2 className="text-2xl font-bold">{staffDetails.name}</h2>
                    <p className="text-gray-600">{staffDetails.role}</p>
                  </div>
                </div>

                {/* Navigation Links with Icons */}
                <div className="flex space-x-6">
                  {/* Salary Icon */}
                  <Link
                    to={`/admin/dashboard/staff/salary-history/${id}`}
                    className=" hover:bg-gray-400 p-2 rounded-full transition duration-300"
                    title="Salary" // Tooltip
                  >
                    <FaMoneyBillAlt className="w-6 h-6" />
                  </Link>

                  {/* Booking Icon */}
                  <Link
                    to={`/admin/dashboard/staff/room-booking-history/${id}`}
                    className=" hover:bg-gray-400 p-2 rounded-full transition duration-300"
                    title="Booking" // Tooltip
                  >
                    <FaCalendarAlt className="w-6 h-6" />
                  </Link>

                  {/* Leave History Icon */}
                  <Link
                    to={`/admin/dashboard/staff/leave-history/${id}`}
                    className=" hover:bg-gray-400 p-2 rounded-full transition duration-300"
                    title="Leave History" // Tooltip
                  >
                    <FaHistory className="w-6 h-6" />
                  </Link>

                  {/* Back Icon */}
                  <span
                    onClick={() => navigate(-1)}
                    className="hover:bg-gray-400 p-2 rounded-full transition duration-300"
                    title="Back" // Tooltip
                  >
                    <FaArrowLeft className="w-6 h-6" />
                  </span>
                </div>
              </div>
            </nav>
            {/* Profile Image */}

            {/* Profile Details */}
            <div className="flex flex-col md:flex-row w-full gap-2 ">
              {/* Grid Layout for Details */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:w-1/2">
                <DetailRow
                  label="Employee ID"
                  value={staffDetails.employeeId}
                />
                <DetailRow label="Email" value={staffDetails.email} />
                <DetailRow
                  label="Phone Number"
                  value={staffDetails.phoneNumber}
                />
                <DetailRow label="Gender" value={staffDetails.gender} />
                <DetailRow
                  label="Date of Birth"
                  value={staffDetails.dateOfBirth}
                />
                <DetailRow label="Shift" value={staffDetails.shift} />
                <DetailRow label="Salary" value={`$${staffDetails.salary}`} />
                <DetailRow
                  label="Status"
                  value={staffDetails.isActive ? "Active" : "Inactive"}
                />
                <DetailRow
                  label="OnLeave"
                  value={staffDetails.onLeave ? "Yes" : "No"}
                />
                <DetailRow label="Salary" value={`$${staffDetails.salary}`} />
              </div>
              <div className="Address md:w-1/2 md:mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DetailRow
                    label="Street"
                    value={staffDetails?.address?.street}
                  />
                  <DetailRow label="City" value={staffDetails?.address?.city} />
                  <DetailRow
                    label="State"
                    value={staffDetails?.address?.state}
                  />
                  <DetailRow
                    label="Zip Code"
                    value={staffDetails?.address?.zipCode}
                  />
                  <DetailRow
                    label="Join Date"
                    value={formatDate(staffDetails?.createdAt)}
                  />
                  <DetailRow
                    label="Updated Date"
                    value={formatDate(staffDetails?.updatedAt)}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  );
};

// Reusable component for each detail row

export default StaffProfile;
