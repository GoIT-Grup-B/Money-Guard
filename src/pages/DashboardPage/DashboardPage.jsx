import DashBoardTable from '../../pages/DashboardPage/DashBoardTable';
import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen">
      <aside>
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col p-6">
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
