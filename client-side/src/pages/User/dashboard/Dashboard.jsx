import React from "react";
import SideNav from "./component/SideNav";
import BottomNavbar from "./component/BottonNavbar";
import { Outlet } from "react-router-dom";

export default function Dashboard({ children }) {
  return (
    <div className="flex w-full  gap-2">
      <SideNav />
      <Outlet />
      <BottomNavbar />
    </div>
  );
}
