import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaHouse } from 'react-icons/fa6';
import { BiStats } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Currency from '../../components/Currency/Currency';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const transactions = useSelector((state) => state.transaction.transactions);
  const currency = useSelector((state) => state.balance.currency);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (transactions) {
      setBalance(calculateBalance());
    }
  }, [transactions]);

  const calculateBalance = () => {
    return (
      transactions?.reduce((total, transaction) => {
        return total + transaction.amount;
      }, 0) || 0
    );
  };

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

      <main className="p-6">
        <section className="mb-8">
          <div
            className="flex flex-col items-center justify-center w-full rounded-lg p-6 shadow-md"
            style={{
              backgroundColor: 'rgba(82, 59, 126, 0.6)',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // Hafif gölge
            }}
          >
            <h2 className="uppercase tracking-wide text-[12px] mb-2 text-[rgba(255,255,255,0.4)] font-poppins">
              Your Balance
            </h2>
            <p className="text-[30px] font-extrabold text-white font-poppins">
              ₺ {balance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <Currency data={currency} />
        </section>
      </main>
    </div>
  );
};

export default Sidebar;
