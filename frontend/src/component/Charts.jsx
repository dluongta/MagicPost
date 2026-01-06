import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Charts = () => {
  // Line chart (biểu đồ đường + chấm)
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Users',
        data: [10, 25, 18, 30, 45],
        borderColor: '#4f46e5',
        backgroundColor: '#4f46e5',
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  // Bar chart (biểu đồ cột)
  const barData = {
    labels: ['Product A', 'Product B', 'Product C'],
    datasets: [
      {
        label: 'Sales',
        data: [120, 190, 90],
        backgroundColor: ['#22c55e', '#3b82f6', '#f97316'],
      },
    ],
  };

  // Pie chart (biểu đồ tròn)
  const pieData = {
    labels: ['Chrome', 'Firefox', 'Safari'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ['#2563eb', '#f97316', '#22c55e'],
      },
    ],
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Analytics Overview</h2>

      <div style={{ maxWidth: 600, marginBottom: 40 }}>
        <Line data={lineData} />
      </div>

      <div style={{ maxWidth: 600, marginBottom: 40 }}>
        <Bar data={barData} />
      </div>

      <div style={{ maxWidth: 400 }}>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default Charts;
