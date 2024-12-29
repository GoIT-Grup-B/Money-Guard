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

  const fetchExpenses = async () => {
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

      setExpenses(expensesData);
    } catch (error) {
      console.error("API'den veri çekilirken hata oluştu:", error);
      setExpenses(Array(chartCategories.length).fill(0));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [selectedMonth, selectedYear]);

  return (
    <div>
      <h2>Statistics</h2>
      <div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Doughnut data={data} options={{ cutout: '70%' }} />
              <div>
                <strong>€ {totalExpenses.toLocaleString()}</strong>
              </div>
            </>
          )}
        </div>
        <div>
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
      <div>
        {chartCategories.map((category, index) => (
          <div key={index}>
            <div>
              <div style={{ backgroundColor: categoryColors[index] }}></div>
              <span>{category}</span>
            </div>
            <div>€ {expenses[index]?.toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div>
        <div>
          <strong>Expenses:</strong> € {totalExpenses.toFixed(2)}
        </div>
        <div>
          <strong>Income:</strong> € {(totalExpenses * 1.2).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
