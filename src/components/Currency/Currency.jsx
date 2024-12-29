import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const Currency = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    const chartData = {
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: 'Purchase',
          data: data.map((item) => item.purchase),
          borderColor: '#FF6384',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#FF6384',
          pointBorderColor: '#FF6384',
        },
        {
          label: 'Sale',
          data: data.map((item) => item.sale),
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#36A2EB',
          pointBorderColor: '#36A2EB',
        },
      ],
    };

    const config = {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
            title: {
              display: true,
              text: 'Currency',
              color: 'white',
            },
          },
          y: {
            ticks: {
              color: 'white',
            },
            title: {
              display: true,
              text: 'Rate',
              color: 'white',
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'white',
            },
            display: true,
            position: 'top',
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };

    const myChart = new Chart(ctx, config);

    return () => {
      myChart.destroy();
    };
  }, [data]);

  return (
    <div className="bg-purple-700 rounded-lg p-6 shadow-md">
      <table className="w-full text-left text-white mb-6">
        <thead>
          <tr className="border-b border-purple-600">
            <th className="py-2">Currency</th>
            <th className="py-2">Purchase</th>
            <th className="py-2">Sale</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-purple-600 hover:bg-purple-800"
            >
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.purchase}</td>
              <td className="py-2 px-4">{item.sale}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default Currency;
