import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { motion } from "framer-motion";
import { IoFilterSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const StaffSalaryHistory = () => {
  const navigate = useNavigate();
  const data = useMemo(
    () => [
      {
        id: 1,
        name: "Fahad Khan",
        employeeId: "248344885",
        role: "Manager",
        salary: 50000,
        date: "2025-01-31",
        paymentStatus: "Completed",
      },
      {
        id: 2,
        name: "Mohd Sufiyan",
        employeeId: "248344885",
        role: "Receptionist",
        salary: 30000,
        date: "2025-01-30",
        paymentStatus: "Pending",
      },
      {
        id: 3,
        name: "Md Karim",
        employeeId: "248344885",
        role: "Cleaner",
        salary: 20000,
        date: "2025-01-29",
        paymentStatus: "Completed",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Employee ID", accessor: "employeeId" },
      { Header: "Role", accessor: "role" },
      { Header: "Salary (₹)", accessor: "salary" },
      { Header: "Date", accessor: "date" },
      { Header: "Payment Status", accessor: "paymentStatus" }, // New column
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <div className="w-full ">
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
        className="flex justify-between items-center"
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className=" flex flex-col justify-center items-center bg-gray-100  w-full"
      >
        <div className="w-full  rounded-2xl ">
          <div className="overflow-x-auto">
            <table
              {...getTableProps()}
              className="w-full border-collapse border border-gray-300"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    className="bg-gray-200"
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="border border-gray-300 px-4 py-2 text-left cursor-pointer"
                      >
                        {column.render("Header")}{" "}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " ↓"
                            : " ↑"
                          : ""}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="hover:bg-gray-100 bg-white"
                    >
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="border border-gray-300 px-4 py-2"
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
        </div>
      </motion.div>
    </div>
  );
};

export default StaffSalaryHistory;
