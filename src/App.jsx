import { Route, Routes } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import AddTransactionForm from './components/AddTransactionForm/AddTransactionForm';
import DashBoardTable from './pages/DashboardPage/DashBoardTable';

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default App;
