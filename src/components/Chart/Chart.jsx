import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Chart = ({ chartData }) => {
  const hasData = chartData && chartData.length > 0;

  const labels = hasData ? chartData.map((data) => data.label) : ['No Data'];
  const dataValues = hasData ? chartData.map((data) => data.value) : [50];

  const data = {
    labels,
    datasets: [
      {
        label: 'Currency Trend',
        data: dataValues,
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#FF6384',
        pointBorderColor: '#FF6384',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { ticks: { color: '#fff' } },
      y: { ticks: { color: '#fff' } },
    },
  };

  return (
    <div className="max-w-md mx-auto">
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
