import DashBoardTable from '../../pages/DashboardPage/DashBoardTable';
import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Statistics from '../../components/Statistics/Statistics';
import useMedia from '../../hooks/useMedia';

const DashboardPage = () => {
  const isMobile = useMedia();
  return (
    <div className="flex tablet:flex-col desktop:flex-row mobile:flex-col mobile:gap-[5px] overflow-y-auto">
      <aside className="overscroll-auto flex-[0.7]">
        <Sidebar />
      </aside>

      <div className="flex flex-[1.3] flex-col p-6">
        {!isMobile && <Statistics /> && <DashBoardTable />}

        <div>
          <Outlet />
        </div>

        <div>
          <ButtonAddTransactions />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
