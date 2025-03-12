// BookingChart.js
import React, { useEffect, useState, useContext } from "react";
import { VisualizedContext } from "../../../../state/Visualized";
import { Chart, registerables } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
Chart.register(...registerables);

const BookingGrowthChart = () => {
  const { bookingVisualized } = useContext(VisualizedContext);
  const [bookingData, setBookingData] = useState([]);
  const [statusFilter, setStatusFilter] = useState(""); // State for status filter

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["bookingDetails", statusFilter], // State ka parameter use kiya
    queryFn: () => bookingVisualized(statusFilter),
  });
  useEffect(() => {
    refetch();
  }, [statusFilter]);

  useEffect(() => {
    if (data?.status) {
      setBookingData(data.bookings);
    } else {
      toast.error(data?.message);
    }
  }, [data]);
  useEffect(() => {
    if (bookingData.length > 0) {
      // Prepare data for the chart
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const labels = bookingData.map(
        (item) => `${months[item._id.month - 1]} ${item._id.year}`
      );
      const totalBookings = bookingData.map((item) => item.totalBookings);
      const totalRevenue = bookingData.map((item) => item.totalRevenue);

      // Create the chart
      const ctx = document.getElementById("bookingChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Total Bookings",
              data: totalBookings,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Total Revenue",
              data: totalRevenue,
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [bookingData]);

  return (
    <div className="lg:w-1/2 w-full bg-white p-2 shadow-sm rounded-sm">
      <div className="bg-blue-500 flex justify-between itmes-center rounded-md">
        <h2 className="text-start p-2 text-white font-bold">
          Booking Data Chart
        </h2>
        {/* Status Filter Dropdown */}
        <div className="text-start p-4 ">
          <label htmlFor="statusFilter  " className="text-white">
            Filter by Status:
          </label>
          <select
            className="rounded-lg outline-none border-none "
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Booked">Booked</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div>Loadding...</div>
      ) : (
        <canvas id="bookingChart" width="800" height="400"></canvas>
      )}
    </div>
  );
};

export default BookingGrowthChart;
