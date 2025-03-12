import React, { useEffect, useState, useContext } from "react";
import { Chart, registerables } from "chart.js";
import { VisualizedContext } from "../../../../state/Visualized";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Register Chart.js components
Chart.register(...registerables);

const UserGrowthChart = () => {
  const { getUserVizualizedData } = useContext(VisualizedContext);
  const [userData, setUserData] = useState([]);

  // fetch user gowth data
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["UserVizualizedData"], // State ka parameter use kiya
    queryFn: getUserVizualizedData,
  });

  useEffect(() => {
    if (data?.status) {
      setUserData(data.usersByMonthYear);
    } else {
      toast.error(data?.message);
    }
  }, [data]);

  // Render the chart when userData changes
  useEffect(() => {
    if (userData.length > 0) {
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
      const labels = userData.map(
        (item) => `${months[item._id.month - 1]} ${item._id.year}`
      );
      const totalUsers = userData.map((item) => item.totalUsers);

      // Destroy existing chart instance if it exists
      const chartCanvas = document.getElementById("userGrowthChart");
      if (chartCanvas.chart) {
        chartCanvas.chart.destroy();
      }

      // Create the chart
      const ctx = chartCanvas.getContext("2d");
      chartCanvas.chart = new Chart(ctx, {
        type: "line", // Use a line chart for growth visualization
        data: {
          labels: labels,
          datasets: [
            {
              label: "Total Users",
              data: totalUsers,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              fill: true, // Fill area under the line
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Users",
              },
            },
            x: {
              title: {
                display: true,
                text: "Month and Year",
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "User Growth Over Time",
            },
          },
        },
      });
    }
  }, [userData]);

  return (
    <div className="lg:w-1/2 w-full shadow-sm p-4 bg-white rounded-sm ">
      <h2 className="bg-blue-500 p-4 text-start text-white font-bold rounded-lg">
        User Growth Chart
      </h2>

      {/* Loading and Error Messages */}
      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {/* Chart Canvas */}
      <canvas id="userGrowthChart" width="800" height="400"></canvas>
    </div>
  );
};

export default UserGrowthChart;
