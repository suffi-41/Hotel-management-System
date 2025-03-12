import React, { Suspense } from "react";
import BookingGrowthChart from "./component.jsx/BookingGrowthChart";
import UserGrowthChart from "./component.jsx/UserGrowthChart";
import BookingChart from "./component.jsx/BookingChart";
import UserChart from "./component.jsx/UserChart";

export default function Report() {
  return (
    <div className="w-full h-full">
      <div className="w-full flex gap-2 lg:flex-row flex-col ">
        <BookingGrowthChart />
        <BookingChart />
      </div>
      <div className="w-full flex gap-2 lg:flex-row flex-col mt-4 ">
        <UserGrowthChart />
        <UserChart />
      </div>
    </div>
  );
}
