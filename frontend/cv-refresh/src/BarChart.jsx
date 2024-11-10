import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ title, labels, data, height = 200 }) => {
  return (
    <div style={{ width: '100%' }}>
      <h3 style={{ marginBottom: '10px' }}>{title}</h3>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: title,
              data: data,
              backgroundColor: '#D13241', // Capital One red
              borderColor: '#D13241', // Border color also Capital One red
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false, // Allows custom height
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              grid: {
                display: false, // Remove grid lines
                drawBorder: false, // Remove axis line
              },
            },
            y: {
              grid: {
                display: false, // Remove grid lines
                drawBorder: false, // Remove axis line
              },
              ticks: { beginAtZero: true }, // Ensure y-axis starts at zero
            },
          },
        }}
        height={height} // Dynamically set the height
      />
    </div>
  );
};

export default BarChart;
