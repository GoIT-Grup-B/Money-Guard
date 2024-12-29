import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';
import Header from '../../components/Header/Header';
import DashBoardTable from '../../pages/DashboardPage/DashBoardTable';

const DashboardPage = () => {
  return (
    <div>
      <Header />
      <DashBoardTable />
      <ButtonAddTransactions/>
    </div>
  );
};

export default DashboardPage;
