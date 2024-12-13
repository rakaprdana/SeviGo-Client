import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartOptions } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface Category {
  _id: string;
  name: string;
  has_complaints: number;
  percentage: string;
}

interface ComplaintData {
  code: number;
  status: string;
  message: string;
  data: {
    totalComplaints: number;
    categoryPercentages: Category[];
  };
}

const ComplaintBarChart: React.FC<{ data: ComplaintData }> = ({ data }) => {
  const categories = data.data.categoryPercentages.map(category => category.name);
  const percentages = data.data.categoryPercentages.map(category => parseFloat(category.percentage.replace('%', '')));

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Complaint Percentage',
        data: percentages,
        backgroundColor: '#fc8c03',
        borderColor: '#ffff',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
          },
        },
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categories',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Percentage (%)',
        },
        type: 'linear',
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: function (tickValue: string | number) {
            if (typeof tickValue === 'number') {
              return tickValue + '%';
            }
            return tickValue;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>{data.message}</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ComplaintBarChart;