// src/components/Table.jsx
import React from "react";
import { useTable } from "react-table";
import { motion } from "framer-motion";

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

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
        <motion.tbody {...getTableBodyProps()} className="bg-white">
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

export default Table;
