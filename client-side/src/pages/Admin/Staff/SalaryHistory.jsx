import React, { useMemo } from "react";
import { useTable } from "react-table";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SalaryHistory = () => {
     const navigate = useNavigate()
  // Sample salary history data
  const salaryHistory = useMemo(
    () => [
      {
        id: 1,
        amount: 50000,
        paymentDate: "2025-01-31",
        status: "Paid",
      },
      {
        id: 2,
        amount: 50000,
        paymentDate: "2024-12-31",
        status: "Paid",
      },
      {
        id: 3,
        amount: 50000,
        paymentDate: "2024-11-30",
        status: "Pending",
      },
      {
        id: 4,
        amount: 50000,
        paymentDate: "2024-10-31",
        status: "Paid",
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
        Header: "Amount",
        accessor: "amount",
        Cell: ({ value }) => `$${value}`, // Format amount as currency
      },
      {
        Header: "Payment Date",
        accessor: "paymentDate",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              value === "Paid"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
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
    useTable({ columns, data: salaryHistory });

  return (
    <div className="flex  justify-center  bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" overflow-hidden w-full "
      >
        {/* Table Header */}
        <div className="p-6 border-b bg-white shadow-sm mb-2 relative">
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
          <p className="text-gray-600">View the salary history .</p>
        </div>

        {/* Salary History Table */}
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

export default SalaryHistory;
