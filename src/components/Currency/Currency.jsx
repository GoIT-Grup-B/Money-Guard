import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateCurrency } from '../../redux/balanceSlice'; // Redux slice'tan action import edilmeli.

const Currency = ({ data }) => {
    const chartRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                const response = await axios.get(
                    'https://api.monobank.ua/bank/currency',
                );
                const filteredData = response.data.filter(
                    (item) =>
                        (item.currencyCodeA === 840 && item.currencyCodeB === 980) || // USD
                        (item.currencyCodeA === 978 && item.currencyCodeB === 980), // EUR
                );
                const formattedData = filteredData.map((item) => ({
                    name: item.currencyCodeA === 840 ? 'USD' : 'EUR',
                    purchase: item.rateBuy,
                    sale: item.rateSell,
                }));
                dispatch(updateCurrency(formattedData));
            } catch (error) {
                console.error('Error fetching currency data:', error);
            }
        };

        fetchCurrencyData();
    }, [dispatch]);

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
        <div
            className="rounded-lg p-6 shadow-md mobile:w-full"
            style={{
                background:
                    'radial-gradient(circle, #2E225F, #523B7E99)', // Gradyan arka plan
                boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)', // Hafif gölge
            }}
        >
            <table className="w-full text-left text-white mb-6">
                <thead>
                    <tr className="border-b border-[rgba(255,255,255,0.2)]">
                        <th className="py-2">Currency</th>
                        <th className="py-2">Purchase</th>
                        <th className="py-2">Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => (
                        <tr
                            key={index}
                            className="border-b border-[rgba(255,255,255,0.1)] hover:bg-[rgba(109,84,235,0.4)]"
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
