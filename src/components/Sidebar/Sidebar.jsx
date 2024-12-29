import React from 'react';
import { useSelector } from 'react-redux';
import { FaHouse } from 'react-icons/fa6';
import { BiStats } from 'react-icons/bi';
import Currency from '../../components/Currency/Currency';
import Chart from '../../components/Chart/Chart';

const Sidebar = () => {
  const balance = useSelector((state) => state.balance.balance);
  const currency = useSelector((state) => state.balance.currency);

  return (
    <div className="bg-gradient-to-b from-purple-800 to-purple-900 text-white font-sans">
      <header className="flex justify-between items-center p-4 border-b border-purple-600">
        <div className="flex gap-4">
          <button className="flex items-center gap-1 hover:text-purple-300">
            <FaHouse className="h-5 w-5" /> Home
          </button>
          <button className="flex items-center gap-1 hover:text-purple-300">
            <BiStats className="h-5 w-5" /> Statistics
          </button>
        </div>
      </header>

      <main className="p-4 md:p-8">
        <section className="mb-8">
          <div className="text-center bg-purple-700 rounded-lg p-6 shadow-md">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-purple-300">
              Your Balance
            </h2>
            <p className="text-4xl font-extrabold mt-2">
              ₹ {balance.toLocaleString()}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <Currency data={currency} />
        </section>

        <section className="mb-8">
          <Chart
            chartData={currency.map((item) => ({
              label: item.name,
              value: item.purchase,
            }))}
          />
        </section>
      </main>
    </div>
  );
};

export default Sidebar;
