import React, { useEffect, useState } from "react";
import RoomCard from "../../components/RoomCard";
import { useSelector } from "react-redux";

export default function ShowRoomCard() {
  const { rooms } = useSelector((state) => state.roomReducer);
  return (
    rooms && (
      <div className="w-full flex justify-center items-center flex-col p-2 lg:10 mt-10 gap-2">
        {rooms &&
          rooms.length !== 0 &&
          rooms?.map((room, index) => {
            return <RoomCard room={room} />;
          })}
      </div>
    )
  );
}
