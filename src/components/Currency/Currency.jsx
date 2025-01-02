import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateCurrency } from '../../redux/balanceSlice';

const Currency = ({ data }) => {
    const chartRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                const response = await axios.get(
                    'https://api.monobank.ua/bank/currency'
                );
                const filteredData = response.data.filter(
                    (item) =>
                        (item.currencyCodeA === 840 && item.currencyCodeB === 980) || // USD
                        (item.currencyCodeA === 978 && item.currencyCodeB === 980)   // EUR
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
        if (!data || data.length < 2) return;

        const ctx = chartRef.current.getContext('2d');

        // Dalga verileri oluşturuluyor
        const waveData = [];
        waveData.push(39); // İlk değer sabit
        waveData.push(data[0].purchase); // İlk tepe değeri
        waveData.push(38); // Ara nokta
        waveData.push(data[1].purchase); // İkinci tepe değeri
        waveData.push(40); // Son değer sabit

        const chartData = {
            labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
            datasets: [
                {
                    label: 'Purchase',
                    data: waveData,
                    borderColor: '#FF6384',
                    backgroundImage: 'linear-gradient(180deg, rgba(109, 84, 235, 1) 0%, rgba(101, 35, 146, 1) 100%)', 
                    borderWidth: 3,
                    tension: 0.4, // Çizgiyi eğimli yap
                    fill: true,  // Çizgi altını doldur
                    pointBackgroundColor: waveData.map((_, index) =>
                        index === 1 || index === 3 ? '#FF6384' : 'transparent'
                    ), // Sadece tepe noktalar görünür
                    pointBorderColor: waveData.map((_, index) =>
                        index === 1 || index === 3 ? '#FF6384' : 'white'
                    ),
                    pointRadius: waveData.map((_, index) =>
                        index === 1 || index === 3 ? 5 : 0
                    ), // Sadece tepe noktalar büyük görünür
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
                            display: false,
                        },
                        title: {
                            display: false,
                        },
                    },
                    y: {
                        min: 35,
                        max: 45,
                        ticks: {
                            display: false,
                        },
                        title: {
                            display: false,
                        },
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            display: false,
                        },
                        display: false,
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
                    'linear-gradient(180deg, rgba(109, 84, 235, 1) 0%, rgba(101, 35, 146, 1) 100%)',
                boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
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
                    {data &&
                        data.map((item, index) => (
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
