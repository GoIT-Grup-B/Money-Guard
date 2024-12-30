import { useState, useEffect, useSelector } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Select from 'react-select';
import Axios from 'axios';

const chartCategories = [
  'Main expenses',
  'Products',
  'Car',
  'Self care',
  'Child care',
  'Household products',
  'Education',
  'Leisure',
  'Other expenses',
];

const categoryColors = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
  '#FFCD56',
  '#C9CBCF',
  '#74D1F6',
];

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
  { value: 2020, label: '2020' },
  { value: 2021, label: '2021' },
  { value: 2022, label: '2022' },
  { value: 2023, label: '2023' },
  { value: 2024, label: '2024' },
];

const Statistics = () => {
  const [selectedMonth, setSelectedMonth] = useState('03');
  const [selectedYear, setSelectedYear] = useState(2023);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState('');
  const [loading, setLoading] = useState(false);

  const data = {
    labels: chartCategories,
    datasets: [
      {
        data: expenses,
        backgroundColor: categoryColors,
        hoverBackgroundColor: categoryColors,
      },
    ],
  };

  const totalExpenses = expenses.reduce((sum, value) => sum + value, 0);

  const token = useSelector((store) => store.user.token);

  const fetchExpensesAndDeposits = async () => {
    setLoading(true);
    try {
      const response = await Axios.get(
        `https://api.monobank.ua/statistics?month=${selectedMonth}&year=${selectedYear}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const apiData = response.data.categories;
      const expensesData = chartCategories.map((category) => {
        const matchedCategory = apiData.find((item) => item.name === category);
        return matchedCategory ? matchedCategory.amount : 0;
      });
      const depositsData = apiData
        .filter((tx) => tx.amount > 0)
        .reduce((total, tx) => total + tx.amount / 100, 0);

      setExpenses(expensesData);
      setIncomes(depositsData);
    } catch (error) {
      console.error("API'den veri çekilirken hata oluştu:", error);
      setExpenses(Array(chartCategories.length).fill(0));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpensesAndDeposits();
  }, [selectedMonth, selectedYear]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>
      <div className="flex flex-wrap justify-center gap-6 w-full">
        <div className="w-full sm:w-1/2 lg:w-1/3 bg-gray-700 rounded-lg shadow-md p-6">
          {loading ? (
            <div className="text-center text-lg">Loading...</div>
          ) : (
            <>
              <Doughnut data={data} options={{ cutout: '70%' }} />
              <div className="text-center mt-4">
                <strong className="text-2xl">
                  € {totalExpenses.toLocaleString()}
                </strong>
              </div>
            </>
          )}
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 flex flex-col gap-4">
          <Select
            options={months}
            defaultValue={{ value: '03', label: 'March' }}
            onChange={(option) => setSelectedMonth(option.value)}
          />
          <Select
            options={years}
            defaultValue={{ value: 2023, label: '2023' }}
            onChange={(option) => setSelectedYear(option.value)}
          />
        </div>
      </div>
      <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chartCategories.map((category, index) => (
          <div
            key={index}
            className="flex justify-between bg-gray-700 p-4 rounded-lg shadow"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: categoryColors[index] }}
              ></div>
              <span>{category}</span>
            </div>
            <div>€ {expenses[index]?.toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="w-full mt-8 flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow">
        <div>
          <strong>Expenses:</strong> € {totalExpenses.toFixed(2)}
        </div>
        <div>
          <strong>Income:</strong> € {incomes.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
