import React, {
  lazy,
  Suspense,
  startTransition,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { useTable } from "react-table";
import { motion, MotionConfig } from "framer-motion";
import UserAvature from "../../../components/UserAvature";
import { IoIosAddCircleOutline } from "react-icons/io";
import { UserContext } from "../../../state/User";
import { IoFilterSharp } from "react-icons/io5";
import { FaUsers, FaUserCheck, FaUserTimes, FaUserCog } from "react-icons/fa"; // Import icons
import { Link } from "react-router-dom";

const DeleteModal = lazy(() => import("../../../components/DeleteModal"));
const EditStaffModal = lazy(() => import("../Staff/component/EditStaffModal"));
const AddStaffModal = lazy(() => import("../Staff/component/AddStaffModal"));

//useQuery
import { useQuery } from "@tanstack/react-query";

// redux
import { actionCreator } from "../../../redux";
import { bindActionCreators, combineReducers } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function StaffManagemant() {
  //
  const dispatch = useDispatch();
  const action = bindActionCreators(actionCreator, dispatch);
  const { SetEmployees, SetCurrentEmployee } = action;

  // state
  const [editStaffModal, setEditStaffModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [addStaffModal, setAddStaffModal] = useState(false);
  const [inActivedEmployeesLength, setInActivatedEmployees] = useState(null);

  //context
  const {
    addStaffDetails,
    getAllEmployees,
    updateEmployeeDetials,
    inActivatedEmployeeFunction,
    getInActivatedEmployees,
  } = useContext(UserContext);

  // useQuery for fetch employees details
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["fetchEmployees"],
    queryFn: () => getAllEmployees(),
  });

  useEffect(() => {
    if (data?.status && Array.isArray(data?.employees)) {
      SetEmployees(data?.employees);
    }
  }, [data]);

  const { Employess } = useSelector((state) => state.employeeReducer);

  const columns = useMemo(
    () => [
      {
        Header: "Image",
        accessor: "avature",
        Cell: ({ value }) => (
          <UserAvature />
          // <img
          //   src={value}
          //   alt="Profile"
          //   className="w-12 h-12 rounded-full object-cover mx-auto"
          // />
        ),
      },
      {
        Header: "Id",
        accessor: "employeeId",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Active",
        accessor: "isActive",
        Cell: ({ value }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              value ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {value ? "Yes" : "No "}
          </span>
        ),
      },
      {
        Header: "Shift",
        accessor: "shift",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.original._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original._id)}
              className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600"
            >
              InActive
            </button>
            <Link
              to={`/admin/dashboard/staff/profile/${row.original._id}`}
              className="bg-gray-500 text-white px-3 py-1 rounded shadow hover:bg-gray-600"
            >
              View
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({
    columns,
    data: Employess.length !== 0 ? Employess : [], // Always pass the data, even if it's empty
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  // Mock edit and delete handlers
  const handleEdit = (id) => {
    startTransition(() => {
      SetCurrentEmployee(id);
      setEditStaffModal(!editStaffModal);
    });
  };

  const handleDelete = (id) => {
    startTransition(() => {
      setSelectedEmployeeId(id);
      setOpenDeleteModal(!openDeleteModal);
    });
  };

  const confirmation = async (id) => {
    const response = await inActivatedEmployeeFunction(id);
    const { status, message } = await response;
    if (status) {
      action.DeleteEmployee(id);
      toast.success(message);
      setOpenDeleteModal(false);
    } else {
      toast.error(message);
    }
  };
  return (
    !isLoading && (
      <div className="w-full h-full">
        <section
          id="overview"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5"
        >
          {/* Total Employees */}
          <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaUsers className="text-blue-500 text-2xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Total Employees</h3>
              <p className="text-2xl">{Employess?.length}</p>
            </div>
          </div>

          {/* Active Employees */}
          <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FaUserCheck className="text-green-500 text-2xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Active Employees</h3>
              <p className="text-2xl">
                {Employess?.filter((employee) => employee.isActive).length}
              </p>
            </div>
          </div>

          {/* Inactive Employees */}
          <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <FaUserTimes className="text-red-500 text-2xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">
                Inactive Employees
              </h3>
              <p className="text-2xl">{inActivedEmployeesLength}</p>
            </div>
          </div>

          {/* Employees on Leave */}
          <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <FaUserCog className="text-yellow-500 text-2xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">On Leave</h3>
              <p className="text-2xl">
                {Employess?.filter((employee) => employee.onLeaave).length}
              </p>
            </div>
          </div>
        </section>
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="flex items-center mb-4 bg-gray-100 min-w-40 max-w-60 cursor-pointer px-4 py-2 rounded-lg shadow-md"
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </span>
          <button
            className="flex items-center mb-4 bg-gray-100 px-4 py-2 rounded-lg shadow-md max-w-60"
            onClick={() => setAddStaffModal(!addStaffModal)}
          >
            <IoIosAddCircleOutline /> Add Staff
          </button>
        </motion.div>
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
        {/* Edit staff modal */}
        {editStaffModal && (
          <Suspense fallback={<div>Loading...</div>}>
            <EditStaffModal
              closeModal={setEditStaffModal}
              updateDetials={updateEmployeeDetials}
            />
          </Suspense>
        )}
        {/* Open and close delete modal */}
        {openDeleteModal && (
          <Suspense fallback={<div>Loading...</div>}>
            <DeleteModal
              onClose={setOpenDeleteModal}
              onConfirm={confirmation}
              id={selectedEmployeeId}
            />
          </Suspense>
        )}
        {addStaffModal && (
          <Suspense fallback={<div>Loading...</div>}>
            <AddStaffModal
              closeModal={setAddStaffModal}
              addStaffDetails={addStaffDetails}
            />
          </Suspense>
        )}
      </div>
    )
  );
}
