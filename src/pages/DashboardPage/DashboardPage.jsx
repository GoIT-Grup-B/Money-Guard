import DashBoardTable from "../../pages/DashboardPage/DashBoardTable"
import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions"
import Sidebar from "../../components/Sidebar/Sidebar"

const DashboardPage = () => {
    return (
        <div className="flex flex-col desktop:flex-row">
            <Sidebar />
            <DashBoardTable />
            <ButtonAddTransactions />
        </div>
    )
}

export default DashboardPage;
