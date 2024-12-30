import DashBoardTable from '../../pages/DashboardPage/DashBoardTable';
import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';
import Sidebar from '../../components/Sidebar/Sidebar';

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-[37.5%]">
        <Sidebar />
      </div>
      <DashBoardTable />
      <ButtonAddTransactions />
    </div>
  );
};

export default DashboardPage;
