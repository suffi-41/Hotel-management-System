import React, { useMemo } from "react";
import { useTable } from "react-table";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // For navigation

const StaffRoomBookingHistory = () => {
  const navigate = useNavigate(); // Hook for back navigation

  // Sample booking history data
  const bookingHistory = useMemo(
    () => [
      {
        id: 1,
        roomNo: "102",
        roomType: "Deluxe",
        checkIn: "2025-02-10",
        checkOut: "2025-02-15",
        status: "Completed",
      },
      {
        id: 3,
        roomNo: "108",
        roomType: "Suite",
        checkIn: "2025-03-05",
        checkOut: "2025-03-10",
        status: "Upcoming",
      },
      {
        id: 8,
        roomNo: "111",
        roomType: "Single",
        checkIn: "2025-02-25",
        checkOut: "2025-02-28",
        status: "Completed",
      },
    ],
    []
  );

  // Define columns for the table
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Room Number", accessor: "roomNo" },
      { Header: "Room Type", accessor: "roomType" },
      { Header: "Check-in Date", accessor: "checkIn" },
      { Header: "Check-out Date", accessor: "checkOut" },
      {
        Header: "Number of Days",
        accessor: "numDays",
        Cell: ({ row }) => {
          const start = new Date(row.original.checkIn);
          const end = new Date(row.original.checkOut);
          const diffTime = Math.abs(end - start);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return <span>{diffDays} days</span>;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              value === "Completed"
                ? "bg-green-100 text-green-800"
                : value === "Upcoming"
                ? "bg-blue-100 text-blue-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {value}
          </span>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: bookingHistory });

  return (
    <div className="flex flex-col items-center ">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden w-full"
      >
        {/* Table Header */}
        <div className="p-6 border-b border-black bg-white shadow-sm mb-2 relative">
          <div className="w-full max-w-4xl flaot-rigth absolute top-10 md:left-2 left-0 ">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-blue-600 hover:text-blue-800 transition duration-300 mb-4"
            >
              <FaArrowLeft className="w-5 h-5 mr-2" />
              <span className="text-lg font-semibold">Back</span>
            </button>
          </div>
          <h2 className="text-2xl font-bold">Booking History</h2>
          <p className="text-gray-600">
            View the booking history of the hotel guests.
          </p>
        </div>

        {/* Booking History Table */}
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="min-w-full">
            <thead className="bg-gray-50">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="bg-white divide-y divide-gray-200"
            >
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-100">
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default StaffRoomBookingHistory;
