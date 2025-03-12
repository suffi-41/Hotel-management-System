import React, { useMemo } from "react";
import { useTable } from "react-table";
import { motion } from "framer-motion";
import { IoFilterSharp } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LeaveHistory = () => {
  const navigate = useNavigate();
  // Sample leave history data
  const leaveHistory = useMemo(
    () => [
      {
        id: 1,
        Name: "Mohd Sufiyan",
        employeeId: "1234567891",
        leaveType: "Sick Leave",
        leaveStart: "2025-01-10",
        leaveEnd: "2025-01-12",
        status: "Approved",
      },
      {
        id: 2,
        Name: "Mohd Sufiyan",
        employeeId: "1234567891",
        leaveType: "Vacation",
        leaveStart: "2024-12-20",
        leaveEnd: "2024-12-25",
        status: "Pending",
      },
      {
        id: 3,
        Name: "Mohd Sufiyan",
        employeeId: "1234567891",
        leaveType: "Casual Leave",
        leaveStart: "2024-11-15",
        leaveEnd: "2024-11-17",
        status: "Rejected",
      },
      {
        id: 4,
        Name: "Mohd Sufiyan",
        employeeId: "1234567891",
        leaveType: "Maternity Leave",
        leaveStart: "2024-10-01",
        leaveEnd: "2024-10-30",
        status: "Approved",
      },
    ],
    []
  );

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "Employee ID",
        accessor: "employeeId",
      },
      {
        Header: "Leave Type",
        accessor: "leaveType",
      },
      {
        Header: "Leave Start Date",
        accessor: "leaveStart",
      },
      {
        Header: "Leave End Date",
        accessor: "leaveEnd",
      },
      {
        Header: "Number of Days",
        accessor: "numDays",
        Cell: ({ row }) => {
          const start = new Date(row.original.leaveStart);
          const end = new Date(row.original.leaveEnd);
          const diffTime = Math.abs(end - start);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Add 1 to include both start and end days
          return <span>{diffDays} days</span>;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              value === "Approved"
                ? "bg-green-100 text-green-800"
                : value === "Pending"
                ? "bg-yellow-100 text-yellow-800"
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
    useTable({ columns, data: leaveHistory });

  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden w-full "
      >
        {/* Table Header */}
        <div className="p-6 border-b bg-white relative mb-2">
        <div className="w-full max-w-4xl flaot-rigth absolute top-10 md:left-2 left-0 ">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition duration-300 mb-4"
          >
            <FaArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-lg font-semibold">Back</span>
          </button>
        </div>
        <h2 className="text-2xl font-bold">Salary History</h2>
        <p className="text-gray-600">
          View the Salary history of the members.
        </p>
      </div>

        <motion.div
          className="flex justify-between items-center mt-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="flex  items-center mb-4 bg-gray-100 min-w-40 max-w-4xl cursor-pointer px-4 py-2 rounded-lg shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <IoFilterSharp className="mr-2" />
            Filter by
            <select className="ml-2 bg-gray-100 cursor-pointer outline-none">
              <option value="all">All</option>
              <option value="manager">Manager</option>
              <option value="receptionist">Receptionist</option>
              <option value="cleaner">Cleaner</option>
              <option value="maintenance">Maintenance</option>
              <option value="Security">Security</option>
            </select>
            And
            <input
              type="month"
              className="ml-2 bg-gray-100 cursor-pointer outline-none"
              placeholder="Month"
            />
          </span>
        </motion.div>

        {/* Leave History Table */}
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
                    onClick={() => onRedirect(row.original.userId)}
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
        </div>
      </motion.div>
    </div>
  );
};

export default LeaveHistory;
