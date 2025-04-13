import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart: React.FC = () => {
  // Data for the donut chart
  const data = {
    labels: ["Apples", "Bananas", "Cherries"],
    datasets: [
      {
        label: "Fruits Distribution",
        data: [30, 20, 50], // Values for each section
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Colors for each slice
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1, // Thickness of the border between slices
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height and width
    plugins: {
      legend: {
        display: false, 
      },
      // legend: {
      //   position: "top" as const, // Position of the legend (top, bottom, left, right)
      // },
      
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const value = tooltipItem.raw;
            return ` ${tooltipItem.label}: ${value}%`;
          },
        },
      },
    },
    cutout: "70%", // Makes it a donut chart (the size of the hole in the middle)
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "60%",
        height: "150px", // Set desired height
        maxWidth: "600px", // Optional max width
        margin: "0 auto", // Center horizontally
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DonutChart;
