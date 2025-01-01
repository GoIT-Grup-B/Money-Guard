import DashBoardTable from '../../pages/DashboardPage/DashBoardTable';
import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className="flex tablet:flex tablet:flex-column desktop:flex-row mobile:flex-col mobile:gap-[5px] mobile:overflow-y-auto">
      <aside className="flex-[2]">
        <Sidebar  />
      </aside>

      <div className="flex flex-[1] flex-col p-6">
        <DashBoardTable />
        <div className="flex-1">
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
