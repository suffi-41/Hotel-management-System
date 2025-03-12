import React from "react";
import { useTable } from "react-table";
import { motion } from "framer-motion";

// Function to calculate the duration between check-in and check-out dates
const calculateDuration = (checkIn, checkOut) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.abs(checkOutDate - checkInDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert time difference to days
  return `${diffDays} Nights`;
};

const RoomBookingHistory = ({ userId, userName }) => {
  // Mock booking history data
  const data = React.useMemo(
    () => [
      {
        id: 1,
        userId: "user1",
        customerName: "John Doe",
        room: "101",
        roomType: "Single Room",
        checkIn: "2025-01-10",
        checkOut: "2025-01-15",
        numGuests: 2,
        status: "Checked Out",
      },
      {
        id: 2,
        userId: "user1",
        customerName: "John Doe",
        room: "102",
        roomType: "Double Room",
        checkIn: "2025-01-12",
        checkOut: "2025-01-20",
        numGuests: 3,
        status: "Checked In",
      },
      // More data...
    ],
    []
  );

  // Filter data for the specific user
  //   const userBookings = data.filter(booking => booking.userId === userId);

  const columns = React.useMemo(
    () => [
      {
        Header: "Room",
        accessor: "room",
      },
      {
        Header: "Room Type",
        accessor: "roomType",
      },
      {
        Header: "Check-In",
        accessor: "checkIn",
      },
      {
        Header: "Check-Out",
        accessor: "checkOut",
      },
      {
        Header: "Duration",
        accessor: "duration", // Will be calculated dynamically
        Cell: ({ row }) =>
          calculateDuration(row.values.checkIn, row.values.checkOut),
      },
      {
        Header: "Number of Guests",
        accessor: "numGuests",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data, // Filtered data for the specific user
    });

  return (
    <motion.div
      className="overflow-x-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <table
        {...getTableProps()}
        className="table-auto w-full text-left border-collapse border border-gray-300"
      >
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 border border-gray-300"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <motion.tbody
          {...getTableBodyProps()}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="bg-white"
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <motion.tr
                {...row.getRowProps()}
                whileTap={{ scale: 0.98 }}
                className="hover:bg-gray-100"
              >
                {row.cells.map((cell) => (
                  <motion.td
                    {...cell.getCellProps()}
                    className="px-4 py-2 border border-gray-300"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                  >
                    {cell.render("Cell")}
                  </motion.td>
                ))}
              </motion.tr>
            );
          })}
        </motion.tbody>
      </table>
    </motion.div>
  );
};

export default RoomBookingHistory;
