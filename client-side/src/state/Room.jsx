import { createContext } from "react";

import {
  getRoomDetialsUrl,
  getOneRoomDetialsUrl,
  addRoomImagesUrl,
  findAvailbleRoomsUrl,
  bookingRoomUrl,
  getUserAllBookingsUrl,
  cancelBookingUrl,
  getRoomBookingHistoryUrl,
  //admin
  getAllBookingsByGuestIdUrl,
  getAllbookingsUrl,
  getBookingDetailsByIdUrl,
} from "../utils/api";

import { logged_token } from "../utils/extra";

export const RoomContext = createContext();
export function Room({ children }) {
  const room = "roomContext";
  const auth_user_token = logged_token();
  const roomDetialsFunction = async () => {
    try {
      const response = await fetch(`${getRoomDetialsUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  // update room details function
  const roomDetialsUpdateFunction = async (id, data) => {
    try {
      const response = await fetch(`${getRoomDetialsUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const addRoomImages = async (formData) => {
    try {
      const response = await fetch(addRoomImagesUrl, {
        method: "POST",
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getOneRoomDetials = async (id) => {
    try {
      const response = await fetch(`${getOneRoomDetialsUrl}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoom = async (id) => {
    try {
      const response = await fetch(`${getRoomDetialsUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const findAvailbleRoom = async (checkInDate, checkOutDate) => {
    try {
      const response = await fetch(
        `${findAvailbleRoomsUrl}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
    }
  };

  // booking function for room
  const headers = {
    "Content-Type": "application/json",
    "authorized-user-token": auth_user_token,
  };
  const BookingRoom = async (data) => {
    try {
      const response = await fetch(bookingRoomUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAllBookings = async () => {
    try {
      const response = await fetch(getUserAllBookingsUrl, {
        method: "get",
        headers: headers,
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
    }
  };
  const cancelBooking = async (id) => {
    console.log(`${cancelBookingUrl}/${id}`);
    try {
      const response = await fetch(`${cancelBookingUrl}/${id}`, {
        method: "DELETE",
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getRoomBookingHistory = async (id) => {
    try {
      const response = await fetch(`${getRoomBookingHistoryUrl}/${id}`);
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.log(error);
    }
  };

  //admin or manger
  const getAllBookingsByGuestId = async (id) => {
    try {
      const response = await fetch(`${getAllBookingsByGuestIdUrl}/${id}`);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBokings = async () => {
    try {
      const res = await fetch(getAllbookingsUrl);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  //get booking detials by booking id
  const getBookingDetialsById = async (id) => {
    try {
      const res = await fetch(`${getBookingDetailsByIdUrl}/${id}`);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RoomContext.Provider
      value={{
        room,
        roomDetialsFunction,
        roomDetialsUpdateFunction,
        addRoomImages,
        getOneRoomDetials,
        deleteRoom,
        findAvailbleRoom,
        //booking
        BookingRoom,
        getUserAllBookings,
        cancelBooking,
        getRoomBookingHistory,
        //admin
        getAllBookingsByGuestId,
        getAllBokings,
        //admin and users
        getBookingDetialsById,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}
