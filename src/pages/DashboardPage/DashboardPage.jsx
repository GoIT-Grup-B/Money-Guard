import DashBoardTable from "../../pages/DashboardPage/DashBoardTable"
import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions"
import Sidebar from "../../components/Sidebar/Sidebar"

const DashboardPage = () => {
    return (
        <div className="flex">
            <Sidebar />
            <DashBoardTable />
            <ButtonAddTransactions />
        </div>
    )
}

export default DashboardPage;
