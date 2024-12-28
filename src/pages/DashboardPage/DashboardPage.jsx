import Header from '../../components/Header/Header';
import DashBoardTable from '../../pages/DashboardPage/DashBoardTable';
import ButtonAddTransaction from "../../components/ButtonAddTransactions/ButtonAddTransactions.jsx"

const DashboardPage = () => {
  return (
    <div>
      <Header />
          <DashBoardTable />
          <ButtonAddTransaction/>
    </div>
  );
};

export default DashboardPage;
