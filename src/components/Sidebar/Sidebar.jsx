import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaHouse } from 'react-icons/fa6';
import { BiStats } from 'react-icons/bi';
import { MdAttachMoney } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Currency from '../../components/Currency/Currency';

const Sidebar = () => {
    const transactions = useSelector((state) => state.transaction.transactions);
    const currency = useSelector((state) => state.balance.currency);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (transactions) {
            setBalance(calculateBalance());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactions]);

    const calculateBalance = () => {
        return (
            transactions?.reduce((total, transaction) => {
                return total + transaction.amount;
            }, 0) || 0
        );
    };

    return (
        <div className="bg-gradient-to-b from-purple-800 to-purple-900 text-white font-sans h-full">
            <header className="flex flex-row mobile:justify-center tablet:flex-col gap-4 p-6 border-b border-purple-600">
                <NavLink
                    to="/dashboard/home"
                    className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-purple-700 text-white' : 'hover:text-purple-300'
                        }`
                    }
                >
                    <FaHouse className="w-10 h-10 tablet:w-5 tablet:h-5" />
                    <p className='hidden tablet:block'>Home</p>
                </NavLink>
                <NavLink
                    to="/dashboard/statistic"
                    className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-purple-700 text-white' : 'hover:text-purple-300'
                        }`
                    }
                >
                    <BiStats className="w-10 h-10 tablet:w-5 tablet:h-5" />
                    <p className='hidden tablet:block'>Statistic</p>
                </NavLink>
                <NavLink
                    to="/dashboard/currency"
                    className={({ isActive }) =>
                        `tablet:hidden flex items-center gap-2 p-2 rounded-md ${isActive ? 'bg-purple-700 text-white' : 'hover:text-purple-300'
                        }`
                    }
                >
                    <MdAttachMoney className="w-10 h-10 tablet:w-5 tablet:h-5" />
                    <p className='hidden tablet:block'>Currency</p>
                </NavLink>
            </header>

            <main className="p-6">
                <section className="mb-8">
                    <div
                        className="flex flex-col items-center justify-center w-full rounded-lg p-6 shadow-md"
                        style={{
                            backgroundColor: 'rgba(82, 59, 126, 0.6)',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
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