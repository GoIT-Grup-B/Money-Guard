import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaHouse } from 'react-icons/fa6';
import { BiStats } from 'react-icons/bi';
import { MdAttachMoney } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Currency from '../../components/Currency/Currency';
import useMedia from '../../hooks/useMedia';
import DashBoardTable from '../../pages/DashboardPage/DashBoardTable';
import Statistics from '../Statistics/Statistics'

const Sidebar = () => {
    const transactions = useSelector((state) => state.transaction.transactions);
    const currency = useSelector((state) => state.balance.currency);
    const [balance, setBalance] = useState(0);
    const [selectedSection, setSelectedSection] = useState('home');
    const { isMobile } = useMedia();

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

    const renderMobileContent = () => {
        switch (selectedSection) {
            case 'currency':
                return <Currency data={currency} />;
            case 'stats':
                return <Statistics />;
            case 'home':
            default:
                return <DashBoardTable />;
        }
    };

    return (
        <div className="tablet:justify-center desktop:justify-start flex flex-col tablet:flex-row desktop:flex-col tablet:gap-4 bg-gradient-to-r from-[#2E1746] to-[#2E225F] text-white font-sans h-full">
            <div className="flex flex-col tablet:w-1/2 mobile:w-full desktop:w-auto">
                <header className="flex tablet:flex-1 flex-row mobile:justify-center tablet:flex-col gap-4 p-6">
                    <NavLink
                        to='/dashboard/home'
                        onClick={() => setSelectedSection('home')}
                        className={`flex items-center gap-2 p-2 rounded-md ${selectedSection === 'home' ? 'bg-[#432f70] text-white' : 'hover:text-purple-300'
                            }`}
                    >
                        <FaHouse className="w-10 h-10 tablet:w-5 tablet:h-5" />
                        <p className="hidden tablet:block">Home</p>
                    </NavLink>
                    <NavLink
                        to='statistics'
                        onClick={() => {
                            console.log('Statistics link clicked');
                            setSelectedSection('stats');
                        }}
                        className={`flex items-center gap-2 p-2 rounded-md ${selectedSection === 'stats' ? 'bg-[#432f70] text-white' : 'hover:text-purple-300'
                            }`}
                    >
                        <BiStats className="w-10 h-10 tablet:w-5 tablet:h-5" />
                        <p className="hidden tablet:block">Statistics</p>
                    </NavLink>
                    <NavLink
                        to='/dashboard/currency'
                        onClick={() => setSelectedSection('currency')}
                        className={`tablet:hidden flex items-center gap-2 p-2 rounded-md ${selectedSection === 'currency' ? 'bg-[#432f70] text-white' : 'hover:text-purple-300'
                            }`}
                    >
                        <MdAttachMoney className="w-10 h-10 tablet:w-5 tablet:h-5" />
                        <p className="hidden tablet:block">Currency</p>
                    </NavLink>
                </header>

                {/* Balance Section */}
                <section className="">
                    <div
                        className="flex flex-col items-center justify-center rounded-lg p-2 h-20 shadow-md mx-6 tablet:w-auto desktop:w-full desktop:m-0 desktop:rounded-none"
                        style={{
                            backgroundColor: 'rgba(82, 59, 126, 0.6)',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <h2 className="uppercase tracking-wide text-[12px] mb-2 text-[rgba(255,255,255,0.4)]">
                            Your Balance
                        </h2>
                        <p className="text-[30px] font-extrabold text-white">
                            ₺ {balance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </section>

                {/* Mobile Content */}
                {isMobile && (
                    <section className="p-4">
                        {renderMobileContent()}
                    </section>
                )}
            </div>

            {/* Currency section for tablet/desktop */}
            {!isMobile && (
                <section className="">
                    <Currency data={currency} />
                </section>
            )}
        </div>
    );
};

export default Sidebar;
