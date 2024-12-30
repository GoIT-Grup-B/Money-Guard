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
    <div
      className="min-h-screen text-white font-sans border-r border-white"
      style={{
        background:
          'linear-gradient(180deg, rgba(109, 84, 235, 0.6) 0%, rgba(101, 35, 146, 0.6) 100%)', // Gradyan renk
        boxShadow: '0px 0px 400px rgba(0, 0, 0, 0.5)', // Gölge efekti
      }}
    >
      <header className={styles.header}>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 hover:text-purple-300 mt-4 ml-4"
        >
          <FaHouse className={styles.icon} />
          <span className={styles.text}>Home</span>
        </Link>
        <Link
          to="/statistics"
          className="flex items-center gap-2 hover:text-purple-300 mt-1 ml-4"
        >
          <BiStats className={styles.icon} />
          <span className={styles.text}>Statistics</span>
        </Link>
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
