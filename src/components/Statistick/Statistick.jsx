import { Doughnut } from 'react-chartjs-2';
import Select from 'react-select';

export default function Statistics({ data, onFilterChange }) {
  const chartData = {
    datasets: [
      {
        data: data.values,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: { position: 'top' },
    },
  };

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const years = [
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
  ];

  const handleMonthChange = (selectedMonth) => {
    onFilterChange((prev) => ({ ...prev, month: selectedMonth.value }));
  };

  const handleYearChange = (selectedYear) => {
    onFilterChange((prev) => ({ ...prev, year: selectedYear.value }));
  };

  return (
    <div>
      <h2>Statistics</h2>
      <div>
        <div>
          <Doughnut data={chartData} options={options}></Doughnut>
        </div>
        <div>
          <Select
            options={months}
            onChange={handleMonthChange}
            placeholder="Months"
          ></Select>
          <Select
            options={years}
            onChange={handleYearChange}
            placeholder="Years"
          ></Select>
        </div>
      </div>
    </div>
  );
}
