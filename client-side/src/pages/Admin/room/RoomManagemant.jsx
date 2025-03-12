import React, {
  useState,
  useMemo,
  lazy,
  Suspense,
  useContext,
  useEffect,
  startTransition,
  useCallback,
} from "react";

import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { FaBed, FaDoorOpen, FaTools, FaWrench, FaEdit } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Edit = lazy(() => import("./component/Edit"));
const DeleteModal = lazy(() => import("../../../components/DeleteModal"));
const Add = lazy(() => import("./component/Add"));
import Table from "../../../components/Table";
import { RoomContext } from "../../../state/Room";
import RoomManagementSkeleton from "../../skeleton/RoomManagemantSkeleton";

//redux

import { actionCreator } from "../../../redux";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";

export default function RoomManagement() {
  const dispatch = useDispatch();
  const action = bindActionCreators(actionCreator, dispatch);
  const { SetCurrentRoom, SetRooms, DeleteRoom } = action;
  const {
    roomDetialsFunction,
    roomDetialsUpdateFunction,
    addRoomImages,
    deleteRoom,
  } = useContext(RoomContext);

  // Fetch room data

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["fetchRooms"], // State ka parameter use kiya
    queryFn: () => roomDetialsFunction(),
  });

  useEffect(() => {
    if (data?.rooms) {
      SetRooms(data?.rooms);
    }
    return () => {
      SetRooms([]);
    };
  }, [data]);

  // State
  const [editRoomModal, setEditRoomModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const columns = useMemo(
    () => [
      { Header: "Room Number", accessor: "roomNumber" },
      { Header: "Room Type", accessor: "type" },
      { Header: "Room Price", accessor: "price" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              value === "available"
                ? "bg-green-100 text-green-600"
                : value === "occupied"
                ? "bg-blue-100 text-blue-600"
                : value === "cleaning"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {value}
          </span>
        ),
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
              Update
            </button>
            <button
              onClick={() => handleDelete(row.original._id)}
              className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600"
            >
              Delete
            </button>
            <Link
              to={`/admin/dashboard/rooms/history/${row.original._id}`}
              className="bg-gray-500 text-white px-3 py-1 rounded shadow hover:bg-gray-600"
            >
              History
            </Link>
            <Link
              to={`/admin/dashboard/rooms/${row.original._id}`}
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
  // Handlers
  const handleEdit = (id) => {
    startTransition(() => {
      //store current room data in redux store
      SetCurrentRoom(id);
      //open edit modal
      setEditRoomModal(true);
    });
  };
  const handleDelete = (id) => {
    startTransition(async () => {
      setDeleteId(id);
      setIsOpenDeleteModal(true);
    });
  };

  const onConfirmDelete = async (id) => {
    const response = await deleteRoom(id);
    const { status, message } = await response;
    if (status) {
      toast.success(message);
      DeleteRoom(id);
      setIsOpenDeleteModal(false);
    } else {
      toast.error(message);
    }
  };

  const [filter, setFilter] = useState(null);
  const { rooms } = useSelector((state) => state.roomReducer);

  //Filtered data
  const filteredRooms = useMemo(() => {
    if (filter === "all") return rooms;
    return rooms?.filter(
      (room) =>
        room?.status?.toLowerCase() === filter?.toLowerCase() ||
        room?.type?.toLowerCase() === filter?.toLowerCase()
    );
  }, [filter, rooms]);

  return isLoading ? (
    <RoomManagementSkeleton />
  ) : (
    <div className="z-10">
      {error && <p>Error loading rooms: {error.message}</p>}
      {/* Overview Cards */}
      <section
        id="overview"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5"
      >
        {/* Total Rooms */}
        <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FaBed className="text-blue-500 text-2xl" />{" "}
            {/* Icon for Total Rooms */}
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Total Rooms</h3>
            <p className="text-2xl">{rooms?.length}</p>
          </div>
        </div>

        {/* Occupied Rooms */}
        <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <FaDoorOpen className="text-green-500 text-2xl" />{" "}
            {/* Icon for Occupied Rooms */}
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Occupied Rooms</h3>
            <p className="text-2xl">
              {rooms?.filter((room) => room.status === "occupied").length}
            </p>
          </div>
        </div>

        {/* Available Rooms */}
        <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <FaBed className="text-purple-500 text-2xl" />{" "}
            {/* Icon for Available Rooms */}
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Available Rooms</h3>
            <p className="text-2xl">
              {rooms?.filter((room) => room.status === "available").length}
            </p>
          </div>
        </div>

        {/* Maintenance Rooms */}
        <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
          <div className="bg-yellow-100 p-3 rounded-full mr-4">
            <FaTools className="text-yellow-500 text-2xl" />{" "}
            {/* Icon for Maintenance Rooms */}
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Maintenance</h3>
            <p className="text-2xl">
              {rooms?.filter((room) => room.status === "maintenance").length}
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <motion.div
        className="flex justify-between itmes-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="flex items-center mb-4 bg-gray-100 px-4 py-2 rounded-lg shadow-md max-w-60">
          <IoFilterSharp className="mr-2" />
          Filter by
          <select
            className="ml-2 bg-gray-100 outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="cleaning">Cleaning</option>
            <option value="maintenance">Maintenance</option>
            <option value="deluxe">Deluxe</option>
            <option value="standard">Standard</option>
            <option value="suite">Suite</option>
            <option value="luxury">Luxury</option>
          </select>
        </span>
        <button
          className="flex items-center mb-4 bg-gray-100 px-4 py-2 rounded-lg shadow-md max-w-60"
          onClick={() => setAddModal(!addModal)}
        >
          <IoIosAddCircleOutline /> Add Room
        </button>
      </motion.div>

      {/* Room Table */}

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <Table
          columns={columns}
          data={filteredRooms.length !== 0 ? filteredRooms : rooms || []}
        />
      )}
      {/* Modals */}
      <Suspense fallback={<div>Loadding</div>}>
        {addModal && <Add closeModal={setAddModal} refetch={refetch} />}
        {editRoomModal && (
          <Edit
            closeModal={setEditRoomModal}
            updateFunction={roomDetialsUpdateFunction}
            addRoomImages={addRoomImages}
          />
        )}
        {isOpenDeleteModal && (
          <DeleteModal
            onClose={setIsOpenDeleteModal}
            onConfirm={onConfirmDelete}
            id={deleteId}
          />
        )}
      </Suspense>
    </div>
  );
}
