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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

const Charts = () => {
  // Line chart
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

  const lineOptions = {
    plugins: {
      datalabels: {
        color: '#000',
        anchor: 'end',
        align: 'top',
        font: {
          weight: 'bold',
        },
      },
    },
  };

  // Bar chart
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

  const barOptions = {
  plugins: {
    legend: {
      position: 'top',
    },
    datalabels: {
      color: '#fff',       
      anchor: 'center',     
      align: 'center',      
      font: {
        weight: 'bold',
        size: 14,
      },
    },
  },
};


  // Pie chart
  const pieData = {
    labels: ['Chrome', 'Firefox', 'Safari'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ['#2563eb', '#f97316', '#22c55e'],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      datalabels: {
        color: '#fff',
        formatter: (value, ctx) => {
          const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
          const percent = ((value / total) * 100).toFixed(1);
          return percent + '%';
        },
        font: {
          weight: 'bold',
          size: 14,
        },
      },
    },
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Analytics Overview</h2>

      <div style={{ maxWidth: 600, marginBottom: 40 }}>
        <Line data={lineData} options={lineOptions} />
      </div>

      <div style={{ maxWidth: 600, marginBottom: 40 }}>
        <Bar data={barData} options={barOptions} />
      </div>

      <div style={{ maxWidth: 400 }}>
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
};

export default Charts;