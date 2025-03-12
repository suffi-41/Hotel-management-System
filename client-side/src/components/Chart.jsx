import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { motion } from "framer-motion";

const BookingChartCard = ({ data, title }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy existing chart instance if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Create new chart
      chartRef.current.chart = new Chart(ctx, {
        type: "line", // You can change this to "bar" or other types
        data: {
          labels: data.labels,
          datasets: [
            {
              label: title,
              data: data.counts,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
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
  }, [data, title]);

  return <motion.canvas
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   exit={{ opacity: 0 }}
   transition={{ duration: 0.5 }}
   ref={chartRef} className="w-full h-64"></motion.canvas>;
};

export default BookingChartCard;
